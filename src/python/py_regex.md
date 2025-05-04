# from: *AUTOMATE THE BORING STUFF*

### Create a `Regex` Object...

```python
regObject = re.compile(r'<regex search string>')
```
> Don't forget to use a **raw string** for the search pattern! Also, `re` must be imported into the file to be called upon.

Regular Expressions can also be <u>grouped</u> using just `()` in the pattern:
```python
object = re.compile(r'(regex)(search)(string)')
```
> object.group(1) = regex
> object.group(2) = search
> .... and so on!
---
