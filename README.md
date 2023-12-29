# SIREN: Sonification Interface for REmapping Nature
> A WebAudio based sonification mapping system designed as an example of the possibilities of WebAudio as a flexible, modular, extensible and shareable framework for sonification.

SIREN is an open-source, web-based sonification workstation that provides an accessible entry point to data mapping sonification and aims to demonstrate a use case for the Web Audio API. With plug-and-play functionality, and numerous methods to customize and create meaningful auditory display, SIREN provides useful features for pedagogy, methods for exploratory data sonification, and an extensible, open-ended development platform. Inspired by common digital audio workstation (DAW) workflows, SIREN provides a familiar and intuitive layout based upon data matrices as tracks that can be chained together as channels, thus allowing values in one data sequence to control a parameter of another data array.

## Features
SIREN's design is focused around the concepts of tracks and channels, which provide nuanced sonification features.
### Tracks
The basic unit of sonification in SIREN is called a "track," and represents one dimension of the data. Multiple tracks can be layered to create a sonify multidimensional data polyphonicallym allowing users to explore the interaction of various aspects of the data. Like DAWs, each track can have different effects applied to it, such as volume, pan, and reverberation, and these can be adjusted specifically for every track. Similarly, track data can be altered to focus on parts of a dataset or to change the sonification mapping scheme from datum to pitches manually or automatically through pruning outliers. Furthermore, mappings between datum to frequencies can be adjusted to be either discrete pitch or a continuous pitch. By itself, the track serves as a starting point for interacting with data, where it can be combined in "channels" to create more complex sonifications.
### Channels
Channels provide another layer of abstraction on top of tracks, and their primary function is to group tracks together for more advanced sonification techniques. Similar to how automation works in DAWs, channels help automate different sound features using tracks as the automation curve. The motivation behind channels is for multiple tracks to be grouped essentially as one track, providing more possibilities and more unique ways to synthesize sound with the data sequence. These modulation mapping features currently include pitch, volume, pan, and reverb, and these features will alter the final sonification depending on the tracks chosen.

## Use Cases
SIREN has a variety of use cases. Most notably, SIREN was featured in the workshop "Sound as ocean memory: ecoacoustics, audification and sonification" hosted by the Ocean Memory Project, where SIREN was used as a vehicle to explore data collected on coral genomes and temperatures. Combining DNA sequences and coral temperatures in a channel demonstrated a meaningful use case for exploring the dataset in a unique method. Apart from oceanic data, SIREN has the potential to sonify other datasets in different areas of study. Through the original concept of channels, SIREN provides another perspective into parameter mapping sonification, and offers an easy tool for rapid sonification prototyping as well as an accessible introduction into parameter mapping sonification for beginners. Due to the low-friction onboarding and intuitive concepts of tracks, SIREN also serves as a potentially useful tool in an educational setting, where newcomers can test out data sonification through SIREN before diving deeper.

## Development
SIREN is an open source project, and the source code is available [here](https://github.com/Kizjkre/siren).
### Node
Be sure to use Node.js version 16.
### `leonardo` branch
This branch contains the source code for SIREN's Leonardo paper.

## Explore SIREN [here](https://kizjkre.github.io/siren)!
