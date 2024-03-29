# Lex's Page

Just a personal project for the love of my life

# Chance of a Farkle
Number of possible scoring rolls, where x is the addition of scores not involving ones or fives (see table below): $$\frac{6^n}{3^n}\sum_{i=1}^{n} (2^{n-i}*3^{i-1}) + x$$

| N | X |
| --- | --- |
| 1 | 0 |
| 2 | 0 |
| 3 | 4 |
| 4 | 52 |
| 5 | 304 |
| 6 | 2476 |

Thus, by subtracting this new value from the total number of possible rolls and dividing, we get the farkle chance:

$$1-\frac{1}{3^n}\sum_{i=1}^{n} (2^{n-i}*3^{i-1})-\frac{x}{6^n}$$
