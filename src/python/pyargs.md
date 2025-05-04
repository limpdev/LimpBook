# Using args in `python`

> Below is a general template for a Python script that accepts one or more command-line arguments. This template uses the `argparse` module, which is a standard way to handle command-line arguments in Python.

```python
import argparse

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Description of your script")

    # Add arguments
    parser.add_argument('required_arg', type=str, help='Description of the required argument')
    parser.add_argument('--optional_arg', type=str, default='default_value', help='Description of the optional argument')
    parser.add_argument('-m', '--multiple_args', nargs='+', help='Description of accepting multiple arguments')

    # Parse arguments
    args = parser.parse_args()

    # Access the arguments
    required_arg_value = args.required_arg
    optional_arg_value = args.optional_arg
    multiple_args_values = args.multiple_args

    # Your script logic here
    print(f"Required argument: {required_arg_value}")
    print(f"Optional argument: {optional_arg_value}")
    if multiple_args_values:
        print(f"Multiple arguments: {', '.join(multiple_args_values)}")

if __name__ == "__main__":
    main()
```

### Explanation:
- **`argparse.ArgumentParser`**: This creates a new argument parser object.
- **`description`**: A brief description of what your script does.
- **`add_argument`**: This method is used to specify which arguments your script accepts.
  - **`required_arg`**: This is a positional argument, meaning it is required and must be provided by the user.
  - **`--optional_arg`**: This is an optional argument. If not provided, it will default to `'default_value'`.
  - **`-m` or `--multiple_args`**: This argument can accept one or more values (`nargs='+'` means one or more arguments).
- **`args = parser.parse_args()`**: This parses the command-line arguments and stores them in the `args` object.
- **`if __name__ == "__main__":`**: This ensures that the `main()` function is called only when the script is run directly, not when it is imported as a module.

### Example Usage:
```bash
python script.py required_value --optional_arg optional_value -m arg1 arg2 arg3
```

This will output:
```
Required argument: required_value
Optional argument: optional_value
Multiple arguments: arg1, arg2, arg3
```

You can modify the template to suit your specific needs, such as adding more arguments or changing the types of the arguments.