<script setup lang="ts">
import { ref, computed } from 'vue';
import { Game, StoryBlock, StoryBlockType, StoryBlockOptions, StoryBlockText } from '@/game/game';
import gameData from '@/game/game.json';


import { onMounted, onUnmounted } from 'vue';

const audio = ref<HTMLAudioElement | null>(null);

onMounted(() => {
    // Загружаем и воспроизводим музыку при монтировании
    audio.value = new Audio('/public/story/sounds/theme.mp3');
    audio.value.loop = true; // Цикличное воспроизведение
    audio.value.volume = 0.5; // Устанавливаем громкость
    audio.value.play().catch((err) => {
        console.warn('Музыка не может быть воспроизведена автоматически:', err);
    });
});

onUnmounted(() => {
    // Останавливаем музыку, если компонент размонтирован
    if (audio.value) {
        audio.value.pause();
        audio.value = null;
    }
});

// Загружаем игру
const game = new Game(gameData);

// Храним текущий блок
const currentBlock = ref<StoryBlock | StoryBlockText | StoryBlockOptions | null>(game.story[0]);

// Вычисляем фоновое изображение
const backgroundImage = computed(() => currentBlock.value?.scene?.img || '/default-background.png');
const characterImage = computed(() => currentBlock.value?.character?.img || '/default-background.png');
const isMainCharacter = computed(() => currentBlock.value?.character?.id === 'Настя');

// Переход к следующему блоку
const goToNextBlock = (nextId: string | undefined) => {
    if (!nextId) return;
    const nextBlock = game.story.find((block) => block.id === nextId);
    if (nextBlock) {
        currentBlock.value = nextBlock;
    } else {
        console.error('Block not found:', nextId);
    }

    console.log(nextBlock)
};

console.log(game);
</script>

<template>
    <div class="story-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
        <!-- Отображение персонажа -->
        <div v-if="currentBlock?.character !== undefined">
            <img class="character"
                :class="{ 'character-main': isMainCharacter, 'character-secondary': !isMainCharacter }"
                :src="characterImage">
        </div>
        <div class="story-content">
            <!-- Отображение имени персонажа -->
            <span class="character-name"
                :class="{ 'character-main': isMainCharacter, 'character-secondary': !isMainCharacter }"
                v-if="currentBlock?.type !== StoryBlockType.text && currentBlock?.character !== undefined">
                {{ currentBlock?.character.id }}
            </span>

            <!-- Отображение текстового блока -->
            <div v-if="currentBlock?.type === StoryBlockType.text">
                <h1 v-if="(currentBlock as StoryBlockText).header">{{ (currentBlock as StoryBlockText).header }}</h1>
                <p>{{ currentBlock.text }}</p>
                <button v-if="currentBlock.next" class="btn btn-primary" @click="goToNextBlock(currentBlock.next)">
                    Далее
                </button>
            </div>

            <!-- Отображение блока реплики -->
            <div v-if="currentBlock?.type === StoryBlockType.line">
                <p>{{ currentBlock.text }}</p>
                <button v-if="currentBlock.next" class="btn btn-primary" @click="goToNextBlock(currentBlock.next)">
                    Далее
                </button>
            </div>

            <!-- Отображение блока с вариантами -->
            <div v-else-if="currentBlock?.type === StoryBlockType.options">
                <p>{{ currentBlock.text }}</p>
                <div class="options">
                    <button v-for="option in (currentBlock as StoryBlockOptions).options" :key="option.text"
                        class="btn btn-option" @click="goToNextBlock(option.next)">
                        {{ option.text }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.story-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    overflow: hidden;
}

.story-content {
    z-index: 101;
    bottom: 1vh;
    position: absolute;
    width: 95vw;
    left: 50%;
    transform: translate(-50%, 0);

    padding: 2rem;
    text-align: left;
    color: white;
    background: #49417c;
    border-radius: 8px;
    border: 5px solid hsl(248, 44%, 34%);
}

.character {
    width: 100vw;
    z-index: 100;
    bottom: 15vh;
    position: absolute;
}

.character.character-main {
    left: -20vw;
}

.character.character-secondary {
    right: -20vw;
}

.character-name {
    padding: .5rem 2rem;
    background: #49417c;
    border-radius: 100px;
    border: 5px solid hsl(248, 44%, 34%);
    font-weight: bolder;

    z-index: 100;
    position: absolute;
    top: -2rem;
}

.character-name.character-main {
    left: 10vw;
}

.character-name.character-secondary {
    right: 10vw;
}

h1 {
    font-size: 1.5rem;
    font-weight: bolder;
    margin-bottom: 1rem;
}

p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

.btn {
    display: block;
    margin-top: .5rem;

    font-size: 1.25rem;
}
</style>