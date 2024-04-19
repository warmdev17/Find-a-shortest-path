## HOW TO USE THIS FEATURE

[FIND A SHORTEST PATH](https://warmdev17.github.io/Find-a-shortest-path/)

You need to create a graph as a json file like THIS

```
{
  "A": {"B": 6, "C": 7, "F": 5},
  "B": {"C": 8, "D": 9, "F": 4},
  "C": {"D": 10, "E": 11, "F": 3},
  "D": {"A": 11, "E": 10, "F": 2},
  "E": {"F": 1},
  "F": {"A": 12, "B": 13, "C": 14, "D": 15, "E": 16}
}
```

## > [TIP]

> you can use GPT or Gemini to create a graph as json file, just copy a sample json above and ask them to create it

Then enter Start Node and End Node and find a shortest path
