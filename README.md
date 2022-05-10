# GLOBAL

- PERHAPS THIS WILL BE HARDER TO MAKE IT WORK WITH RAILS reorganize JS code in multiple JS files (when necessary) and create a folder for them
- make games responsive ===> add touch events
- center boards and texts (cards : 1 for game board, one for score, instructions etc)
- resize boards to be at least all the same height
- create a Rails app that regroups all the games in one app.
- You can navigate via navbar (selected game is highlighted)
- (Would be good to display games with AJAX in the same centered square (with a background color OR image that fits every game)) OR choose an according background for each game (GB for tetris, etc...)
- Register to keep track of your scores (Best / Last)
- And to keep track of number of games played for each game
- add app leaderboard per game
- choose a game that you can only play after signing up
- choose a game that you can only play after reaching a certain global score OR a certain amount of games played OR after playing at least one game of each.

## rock paper scissors
- DONE add rock papers scissors lizard spock
- DONE add picture for rules
- add images instead of text
- add score tracker

## memory game
- add flip animation
- add replay button
- add tries tracker
- ? tries impacts score ? (<10 tries = scorex2, 10<=tries<=20 scorex1 <20 tries scorex0.5)
- ? add 'leaderboard' with best scores ?
- ? add level 2 with 4x4 or 5x5 ?

## whack-a-mole
- add Start/Pause/Resume button (or use spacebar for that)
- add background image
- randomize mole image
- Replay button
- add config setup for game duration (10secs 20secs etc)
- add sound when mole is whacked
- ? add 'leaderboard' with best scores (divided by game duration) ?

## breakout
- add Start/Pause/Resume button (use spacebar for that)
- add random background color OR random background images for blocks
- try to give blocks a random size and still fill the top
- add Give up button = triggers lose
- add Replay button
- when win : go to level 2 ? ball faster
- when win level 2 : go to level 3 ? as fast as level 2 and player bar smaller
- add sound when block is destroyed (and when ball hits player bar)
- try to find and fix ball / player bar collisions imperfections and occasional bugs

## frogger
- create divs with Javascript (function createBoard)
- DONE can start and pause using spacebar
- add replay button (and/or add replay function to space bar after win or loss)
- increase square size
- add levels (or setup speed)
- DONE add images
- DONE rename car right c1 by c4 and add this to 'lose' function
- make images (car) fit the square
- DONE Make frog visible on startup
- add 'plouf' and 'sprotch' when hitting water / car
- replace keyup for spacebar by keypress?
- add image transparency

## match four
- write better winConditions AND better checkForWin (inspired by noughts and crosses maybe?)
- Add borders to all squares (even when filled) (except the bottom ones)
- add background image for grid and for body

## space invaders
- configure lasers to disappear after reaching top
- fix Game Over when reached bottom
- add images
- add levels ==> faster aliens speed
- add infinite spawning aliens?
- add score tracker between levels?

## snake
- adapt boardgame size to display score (css => ##vm) OR container and display flex (//tetris) ?
- add images for food
- add image for snake head & for snake body
- add background image for grid and body
- add score counter & display
- make a 3-squares starting snake
- add speed settings

## tetris
- make it so that you can move when reaching bottom line (setInterval), before it freezes ( ```sleep().then()``` ? or "settimeout")
OR create an intermediate state between move and taken ?
- create rightRdge and leftEdge functions (and remove corresponding 'const' from moveRight & moveLeft ) && add them to rotation function
- for rotateLeft ==> make it so if current rotation 0 go to currentRotation 3 else currentRotation --
- Read about keyup / keydown / keypress differences
- create nextTetromino array by selecting the [0] of tetrominoes array?
- fix tetrominoes drawing so that they display properly (right under top & centered)
- fix nextDisplay shape (center) ==> perhaps could be done by fixing previous step ?
- set ŝpecific colors for each tetromino
- fix bug where a tetromino can 'merge' into another if moved just before reaching the 'taken' div ==> related to first point.
- fix tetromino position after removing lines (appears where it should be before line removal but doesnt seem to exist : doesnt move and disappears when 'real' tetromino reaches it)
- add different score count for 2, 3 and 4 lines
- DONE ( Thanks JBV !) fix rotateLeft (for L and T specially)
- DONE ( Thanks JBV !) fix bug making tetromino disappear if first in put is rotateLeft
- display next tetromino, scores and instructions together on the right of the game board
- add speed settings and/or auto increase speed
- add touch events
- fix rotations when nearby a frozen tetromino (merging problem again)
- ternary function for freeze function
