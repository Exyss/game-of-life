# Conway's Game of Life

To play the game, [click here](https://exyss.github.io/game-of-life/play)!

## How does the game work?
__Conway's Game of Life__ is a famous cellular automata that simulates the evolution of a society made by very simple life forms.

The universe of the Game of Life constists in a two-dimensional grid of square __cells__, each of which can either be dead or alive.

When a generation passes, every cell interacts with its eight neighbours, which are horizontally, vertically or diagonally adjacent, changing it's state based on four different __rules__.

#### Rules

- Any alive cell with less than two alive neighbours dies, as if caused by solitude.
- Any alive cell with two or three alive neighbours lives on to the next generation.
- Any alive cell with more than three alive neighbours dies, as if caused by overpopulation.
- Any dead cell with exactly three alive neighbours becomes alive, as if caused by reproduction.

#### What's particular about this game?

While having very simple rules, this game becomes very interesting when studying and applying patterns.

A __pattern__ is a starting configuration choosen by the user, which then evolves in a very interesting way. *Even the simplest of patterns can evolve into [something huge](https://www.youtube.com/watch?v=Aq51GfPmD54).*

The game has also been classified __Turing Complete__ by mathematicians, meaning that it *can* emulate a [completely working computer](https://www.youtube.com/watch?v=8unMqSp0bFY).

## Preview

Here's an example of how a pattern can evolve into something cool looking!

![Example](/res/example.gif)

## In-game tools

This game's variant contains some tools to help you to track, evolve and setup your patterns.

* Generation, population and status statistics
* Completely automatic or step-by-step evolution
* A "drawing" tool linked to your mouse
    * Simple click on a cell - Change the state of the cell
    * Prolonged left click - Change the state of hovered cells into alive 
    * Prolonged right click - Change the state of hovered cells into dead

## Contributing

Any contributions you make are greatly appreciated!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/{FEATURE_NAME}`)
3. Commit your Changes (`git commit -m '{DESCRIPTION}'`)
4. Push to the Branch (`git push origin feature/{FEATURE_NAME}`)
5. Open a Pull Request

## License

Distributed under the GNU General Public License v3.0. See `LICENSE` for more information.