class Character {
    id: string;
    img: string;

    constructor(data: Partial<Character> = {}) {
        this.id = data.id || '';
        this.img = data.img || '';
    }
}

class Scene {
    id: string = ''
    img: string = ''

    constructor(data: Partial<Character> = {}) {
        this.id = data.id || '';
        this.img = data.img || '';
    }
}

enum StoryBlockType {
    text = "text",
    line = "line",
    options = "options"
}

class StoryBlock {
    id: string;
    type: StoryBlockType;
    text: string;
    character?: Character;
    scene?: Scene;
    prev?: string;
    next?: string;

    constructor(data: Partial<StoryBlock> = {}) {
        this.id = data.id || '';
        this.type = data.type || StoryBlockType.text;
        this.text = data.text || '';
        this.character = data.character;
        this.scene = data.scene;
        this.prev = data.prev;
        this.next = data.next;
    }
}

class StoryBlockText extends StoryBlock {
    header: string | undefined = ''

    constructor(data: Partial<StoryBlockText> = {}) {
        super(data);
        this.header = data.header;
    }
}

class StoryBlockOption {
    text: string;
    next: string; // ID блока

    constructor(data: Partial<StoryBlockOption> = {}) {
        this.text = data.text || '';
        this.next = data.next || '';
    }
}

class StoryBlockOptions extends StoryBlock {
    options: StoryBlockOption[];

    constructor(data: Partial<StoryBlockOptions> = {}) {
        super(data);
        this.options = (data.options || []).map((option) => new StoryBlockOption(option));
    }
}


class Game {
    characters: Character[] = [];
    scenes: Scene[] = [];
    story: StoryBlock[] = [];

    constructor(data: any = {}) {
        // Преобразование массива персонажей
        this.characters = (data.characters || []).map((char: any) => new Character(char));

        // Преобразование массива сцен
        this.scenes = (data.scenes || []).map((scene: any) => new Scene(scene));

        // Преобразование массива истории
        this.story = (data.story || []).map((block: any) => {
            // Найти сцену по её id
            const scene = this.scenes.find((s) => s.id === block.scene);

            // Найти персонажа по его id
            const character = this.characters.find((c) => c.id === block.character);

            // Преобразование блока на основе типа
            if (block.type === "text") {
                return new StoryBlockText({ ...block, scene, character });
            } else if (block.type === "options") {
                const options = (block.options || []).map(
                    (option: any) => new StoryBlockOption(option)
                );
                return new StoryBlockOptions({ ...block, scene, character, options });
            }

            return new StoryBlock({ ...block, scene, character });
        });
    }
}

export {
    Game,
    Character,
    Scene,
    StoryBlockType,
    StoryBlock,
    StoryBlockOption,
    StoryBlockOptions,
    StoryBlockText
};