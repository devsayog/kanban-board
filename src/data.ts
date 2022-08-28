import { nanoid } from 'nanoid'

export const board = [
  {
    id: nanoid(),
    title: 'to do',
    tasks: [
      {
        id: nanoid(),
        title: 'create wireframe',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio cum sint tempora eveniet impedit, repudiandae perspiciatis ullam doloribus non?',
        date: new Date(),
        stacks: [
          { id: nanoid(), text: 'figma' },
          { id: nanoid(), text: 'PS' },
          { id: nanoid(), text: 'XD' },
        ],
      },
      {
        id: nanoid(),
        title: 'create final design',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio cum sint tempora eveniet impedit, repudiandae perspiciatis ullam doloribus non?',
        date: new Date(),
        stacks: [
          { id: nanoid(), text: 'figma' },
          { id: nanoid(), text: 'PS' },
          { id: nanoid(), text: 'XD' },
        ],
      },
      {
        id: nanoid(),
        title: 'Code frontend',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio cum sint tempora eveniet impedit, repudiandae perspiciatis ullam doloribus non?',
        date: new Date(),
        stacks: [
          { id: nanoid(), text: 'figma' },
          { id: nanoid(), text: 'PS' },
          { id: nanoid(), text: 'XD' },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    title: 'In progress',
    tasks: [
      {
        id: nanoid(),
        title: 'create mockup',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio cum sint tempora eveniet impedit, repudiandae perspiciatis ullam doloribus non?',
        date: new Date(),
        stacks: [
          { id: nanoid(), text: 'figma' },
          { id: nanoid(), text: 'XD' },
        ],
      },
      {
        id: nanoid(),
        title: 'Logo design',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore distinctio cum sint tempora eveniet impedit, repudiandae perspiciatis ullam doloribus non?',
        date: new Date(),
        stacks: [],
      },
    ],
  },
  {
    id: nanoid(),
    title: 'done',
    tasks: [],
  },
]
