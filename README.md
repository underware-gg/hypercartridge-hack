# HyperCartridge

```
  _____________________
 |   _______________   |
  \ |_______________| / 
  | |_____HYPER_____| | 
  / |___CARTRIDGE___| \ 
 |  |_______________|  |  There once was a cartridge so hyper,
 |                     |  It helped you mint apps like a sniper.
 |       Mintable      |  With logic and state,
 |    Collaborative    |  A commodore IDE; great!
 |     Application     |  And deployable to ENS like a viper!
 |      Cartridges     |
 |                     |
 |                     |
 |__|_______________|__|

```

HyperCartridge mints ~~collaborative~~ applications into NFT "cartridges", which can be retrieved and run locally, or optionally served as a static site or via an ENS domain.

Each HyperCartridge is a self-sovereign encapsulation of logic and state for an application. The first HyperCartridge is an IDE that can be used to design and mint more HyperCartridges.

HyperCartridges are written using ValueScript (a dialect of TypeScript with value semantics) and can be used to make single player applications, ~~or linked to an edge server to make collaborative, multiplayer applications~~.

Each HyperCartridge is comprised of the HyperCartridge kernel (the "kernaal"), application logic written in ValueScript, and metadata (such as the server URL). A deployment server accepts a destination address and the cartridge application logic, pins the application logic in IPFS and mints an NFT pointing to the application logic, then transfers the NFT to the users address (paying gas, thanks HyperCartridge!)

~~An optional server allows users to deploy ValueScript for state transitions and to synchronise the state between clients to enable collaborative experience. (Not finished).~~