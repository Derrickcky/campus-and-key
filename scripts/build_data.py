"""Generate browser-ready summaries without changing any original dataset."""
import csv, json, math, statistics
from datetime import date
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def number(value):
    try:
        n = float(value)
        return n if math.isfinite(n) else None
    except (ValueError, TypeError):
        return None

def median(values):
    return statistics.median(values) if values else None

def summarize(rows):
    prices, days, dates = [], [], []
    for row in rows:
        price = number(row['sale_price'])
        if price is not None and price >= 1000:
            prices.append(price)
        try:
            delta = (date.fromisoformat(row['contract_date']) - date.fromisoformat(row['list_date'])).days
            if delta >= 0:
                days.append(delta)
        except ValueError:
            pass
        try:
            dates.append(date.fromisoformat(row['sale_date']).isoformat())
        except ValueError:
            pass
    return dict(sales=len(rows), priceCount=len(prices), excluded=len(rows)-len(prices),
                median=median(prices), dom=median(days), domCount=len(days),
                highPrices=sum(p>5000000 for p in prices),
                missingSaleDates=len(rows)-len(dates), start=min(dates) if dates else None,
                end=max(dates) if dates else None,
                campuses=len({r['university'] for r in rows}), states=len({r['state'] for r in rows}))

if __name__ == '__main__':
    with (ROOT/'data/college_town_home_sales.csv').open(newline='', encoding='utf-8-sig') as f:
        rows=list(csv.DictReader(f)) # identifiers remain strings
    if len({r['listing_id'] for r in rows}) != len(rows):
        raise ValueError('Duplicate listing_id; resolve before generating summaries.')
    cities=[]
    for city,state in sorted({(r['city'],r['state']) for r in rows}):
        subset=[r for r in rows if (r['city'],r['state'])==(city,state)]
        cities.append(dict(city=city,state=state,**summarize(subset)))
    result=dict(overall=summarize(rows), cities=cities)
    (ROOT/'assets/data.js').write_text('window.HOME_DATA = '+json.dumps(result,allow_nan=False)+';\n')
    print(json.dumps(result['overall'],indent=2))
