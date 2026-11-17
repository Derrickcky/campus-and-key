"""Independent SQLite verification of all dashboard summaries and original file hashes."""
import hashlib,json,sqlite3,statistics
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
expected=json.loads((ROOT/'assets/data.js').read_text().removeprefix('window.HOME_DATA = ').strip().removesuffix(';'))
db=sqlite3.connect(f'file:{ROOT}/data/college_town_home_sales.sqlite?mode=ro',uri=True)
def median_query(sql,args):
    v=[r[0] for r in db.execute(sql,args)]
    return statistics.median(v) if v else None
for s in [expected['overall'],*expected['cities']]:
    where=' WHERE city=? AND state=?' if 'city' in s else ' WHERE 1=1'
    args=(s['city'],s['state']) if 'city' in s else ()
    assert s['sales']==db.execute('SELECT COUNT(*) FROM home_sales'+where,args).fetchone()[0]
    prices='SELECT sale_price FROM home_sales'+where+' AND sale_price>=1000'
    assert s['median']==median_query(prices,args)
    assert s['priceCount']==len(db.execute(prices,args).fetchall())
    assert s['excluded']==s['sales']-s['priceCount']
    timing='SELECT CAST(julianday(contract_date)-julianday(list_date) AS INTEGER) FROM home_sales'+where+' AND julianday(contract_date)-julianday(list_date)>=0'
    assert s['dom']==median_query(timing,args)
    assert s['domCount']==len(db.execute(timing,args).fetchall())
    for field,query in [('highPrices','COUNT(CASE WHEN sale_price>5000000 THEN 1 END)'),('missingSaleDates','COUNT(*)-COUNT(sale_date)'),('start','MIN(sale_date)'),('end','MAX(sale_date)'),('campuses','COUNT(DISTINCT university)'),('states','COUNT(DISTINCT state)')]:
        assert s[field]==db.execute('SELECT '+query+' FROM home_sales'+where,args).fetchone()[0],field
assert expected['overall']['sales']==sum(c['sales'] for c in expected['cities'])
for name,digest in json.loads((ROOT/'scripts/original_checksums.json').read_text()).items():
    assert hashlib.sha256((ROOT/'data'/name).read_bytes()).hexdigest()==digest,name
print('PASS: Every metric for all 18 cities and the pooled sample matches the original SQLite dataset. All five original SHA-256 hashes unchanged.')
