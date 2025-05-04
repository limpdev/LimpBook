# The Go Programming Language - Notable Content

> Chapter 1 is a tut orial on the basic cons tructs of Go, int roduce d thro ugh a dozen programs for ever yday tasks like reading and writing files, for matting text, creating images, and communicating with Internet clients and servers. 

> Chapter 2 describes the structural elements of a Go program—de clarat ions, var iables, new types, packages and files, and scope. 

> Chapter 3 dis cusses numbers, boole ans, str ings, and constants, and explains how to pro cess Unico de. 

> Chapter 4 describ es composite typ es, that is, types bui lt up fro m simpler ones using arrays, maps, str ucts, and sli ces, Go ’ s appro ach to dy namic lists. 

> Chapter 5 covers functions and discusses error handling, panic and recover, and the deferst atement. Chapters 1 through 5 are thu s the basics, things that are part of any mainst ream imperat ive language . Go’s syntax and sty le som etimes dif fer fro m ot her languages, but most program- mers will pick them up quickly. The remaining chapt ers focus on topics where Go ’s approach is less conventional: methods, interfaces, concurrency, packages, testing , and reflec tion. Go has an unusual approach to obj ect-oriented programming. There are no class hierarchies, or indeed any class es; comp lex object behaviors are created from simpler ones by composition, not inheritance. Methods may be associated with any user-defined type, not just structures, and the rel ation ship bet ween con crete typ es and abstrac t types (interfaces) is imp licit, so a concrete type may satisfy an interface that the type’s designer was unaware of. Methods are covered in Chapter 6 and int erfaces in Chapter 7. 

> Chapter 8 presents Go ’ s appro ach to con cur rency, which is bas ed on the ide a of communic at- ing sequential pro cesses (CSP), embodie d by goroutines and channel s. 

> Chapter 9 explains the more tradition al asp ects of con cur rency bas ed on share d var iables. 

> Chapter 10 des crib es packages, the mech anism for organizing librar ies. This chapt er als o shows how to make effec tive use of the go to ol, which provides for compi lat ion, testing , benchmarking , prog ram formatting , do cumentation, and many other tasks, all wit hin a single command. 

> Chapter 11 deals wit h test ing , where Go takes a not ably lig htweig ht appro ach, avoiding abstrac tion-l aden framewor ks in favor of simple librar ies and tools. The testing librar ies prov ide a found ation atop which more complex abstrac tions can be bui lt if necessary. 

> Chapter 12 dis cusses reflec tion, the abi lit y of a prog ram to examine its own represent ation during exe cut ion. Reflec tion is a pow erful tool, thoug h on e to be used caref ully; this chapt er explains finding the rig ht bal ance by showing how it is used to imp lement som e important Go librar ies. 

> Chapter 13 explains the gory details of low-level programming that uses the unsafe package to step around Go’s type system, and when that is appropriate.
---