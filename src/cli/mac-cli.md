
#  mac CLI

> OS X command line tools for developers

## General Utilities:
- update- Install OS X software updates, update installed Ruby gems, Homebrew, npm and their installed packages
- upgrade- Upgrade Mac CLI to the latest version
- uninstall- Uninstall Mac CLI
- lock- Lock
- restart- Restart OS X
- sleep- Sleep mode
- shutdown- Shutdown
- uptime- Get the time since last restart
- volume- Get the volume from the terminal
- volume -  Set the volume from the terminal = Level (0-100)
- volume:mute- Mute volume
- volume:unmute- Unmute volume
- volume:ismute- Check if the volume is muted or not
- screensaver- Start screensaver
- folders:list- List folders in current directory with their current size
- folder:size- Calculate current folder size
- dock:add-space -  Add blank space to dock - - [1;32mN = Number of spaces to add
- eject-all- Eject all mounted volumes and disks
- battery- Get battery information
- info- Get OS X version information
- find:text -  Find exact phrase recursively inside directory = Text string
- find:biggest-files - Find biggest files inside directory
- find:biggest-directories - Find biggest directories inside directory
- zip:extract -  Extract Zip file to current folder = Zip file to extract
- gzip:compress -  Compress current file using Gzip = File to compress
- gzip:extract -  Extract Gzip file to current folder = Gzip file to extract
- tar:compress -  Compress X file/directory using tar with progress indicator = File or directory
- tar:extract -  Extract tar file to current folder = Tar file to extract


## Git Utilities:
- git:config- Display local Git configuration
- git:open- Open current repository on Github
- git:create:branch- Create branch based on current branch
- git:branches:date- Get last update date for all branches in current project
- git:undo-commit- Undo latest commit
- git:log- See latest commits IDs and titles for current branch
- git:branch- See all branches
- git:branch:rename- Rename Git branch
- git:branch:remove-local- Remove local Git branch
- git:branch:remove-remote- Remove local and remote Git branch
- git:branch- See all branches
- git:add-removed- Add removed files to staged files
- git:size- Get size for current Git repository
- [0m

## Homebrew Utilities:
- brew:update- Upgrade Homebrew, installed Homebrew packages, and cleanup

## Network Utilities:
- speedtest- Internet connection speed test
- ports- List of used ports
- ip:local- Get local IP address
- ip:public- Get public IP address

## DNS Utilities:
- dns:list- List DNS server(s)
- dns:add- Add DNS server
- dns:remove- Remove DNS server
- dns:flush- Flush DNS cache

## Performance and maintenance Utilities:
- system- Show system information to review mac performance
- temp- Show temperature, fan and battery statistics
- memory- See memory usage sorted by memory consumption
- trash:empty- Empty trash
- trash:size- Calculate trash size

## Search Utilities:
- find:recent -  Find files modified in the last N minutes = number of minutes
- search:replace -  Search and replace string in file = File to perform the search and replace operation

## SSH Utilities:
- ssh:download-file -  Download file from remote server through SSH - X = Path of the remote file to download
- ssh:download-folder -  Download entire folder from remote server through SSH - X = Path of the remote folder to download
- ssh:sync:local -  Sync local folder with remote folder using rsync through SSH (download remote folder to local folder)
- ssh:sync:remote -  Path of the remote folder to sync from local folder (upload local folder to remote folder)
- ssh:upload -  Upload file to remote server through SSH - X = Path of the file to upload to the remote server
- ssh:public-key -  Get public SSH key for local machine





Run - help- [0m for full usage, - categories- [0m for categories list, or - {category}- [0m for usage related to {category}
- [0m
