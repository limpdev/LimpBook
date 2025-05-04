---
title: Uninstalling Python on UNIX-based System
draft: false
---

- Specifically macOS: Below is the full per-version removal method for Python

```bash
# The version of Python that you want to delete
python_version_number=3.10
sudo rm -rf /Library/Frameworks/Python.framework/Versions/${python_version_number}/
sudo rm -rf "/Applications/Python ${python_version_number}/"
cd /usr/local/bin && ls -l | grep "/Library/Frameworks/Python.framework/Versions/${python_version_number}" | awk '{print $9}' | sudo xargs rm
```
