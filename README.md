js_music_robot
==============
Full name: JavaScript Music Robot

A music program using the web audio api and to generate music in the browser.


Features:
    - Reasonably low memory requirement
    - mixer ui
    - Separate channel mixing (filter, pan, volume, fx)
    - Delay and Convolution fx sends for each track
    - Visual spectrum analyser for each channel
    - Automatic key adjustment (based at A-minor)
    - Mode shift base key
    - Transpose base key
    - Tempo control
    - Some example sequences, mixes, beats and riffs


Note: This project has been built over about 2 weeks of hobby coding and is accordingly messy, use with caution. It currently seems to works reasonably reliably only in chrome.

Predicted Changes
=================

* Break out riff data from nasty structure
* Visualise riff data
* Fix the mode controller to follow transpose
* Add manual mode (disabled automation)
* Add inserts module between source and filter nodes