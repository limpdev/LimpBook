# rdfind

#### Usage: rdfind [options] FILE ...

> Finds duplicate files recursively in the given FILEs (directories),and takes appropriate action (by default, nothing). Directories listed first are ranked higher, meaning that if a file is found on several places, the file found in the directory first encountered on the command line is kept, and the others are considered duplicate.

#### options: (default choice within parentheses)

```sh
 -ignoreempty      (true)| false  ignore empty files (true implies -minsize 1,
                                  false implies -minsize 0)
 -minsize N        (N=1)          ignores files with size less than N bytes
 -maxsize N        (N=0)          ignores files with size N bytes and larger (use 0 to disable this check).
 -followsymlinks    true |(false) follow symlinks
 -removeidentinode (true)| false  ignore files with nonunique device and inode
 -checksum           md5 |(sha1)| sha256 | sha512
                                  checksum type
 -deterministic    (true)| false  makes results independent of order
                                  from listing the filesystem
 -makesymlinks      true |(false) replace duplicate files with symbolic links
 -makehardlinks     true |(false) replace duplicate files with hard links
 -makeresultsfile  (true)| false  makes a results file
 -outputname  name  sets the results file name to "name" (default results.txt)
 -deleteduplicates  true |(false) delete duplicate files
 -sleep              Xms          sleep for X milliseconds between file reads.
                                  Default is 0. Only a few values
                                  are supported; 0,1-5,10,25,50,100
 -dryrun|-n         true |(false) print to stdout instead of changing anything
 -h|-help|--help                  show this help and exit
 -v|--version                     display version number and exit
```
> If properly installed, a man page should be available as man `rdfind`.

---

