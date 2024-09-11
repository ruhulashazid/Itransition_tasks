let a = process.argv.slice(2), b = a[0] || '', c = b.length, d = ''; 
for (let i = 0; i < c; i++) 
  for (let j = i + 1; j <= c; j++) 
    if (a.every(e => e.includes(b.slice(i, j))) && j - i > d.length) d = b.slice(i, j); 
console.log(d);
