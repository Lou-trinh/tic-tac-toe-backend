<template>
  <div id="app">
    <h1>Tic-Tac-Toe</h1>
    <div class="board">
      <div
        v-for="(cell, index) in board"
        :key="index"
        class="cell"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>
    <h2 v-if="status">{{ status }}</h2>
    <button @click="resetGame">Chơi lại</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const board = ref(Array(9).fill(''));
const currentPlayer = ref('X');
const status = ref('');
const movesCount = ref(0);
const apiUrl = 'http://localhost:3000/games'; // Thay đổi nếu backend chạy cổng khác

const checkWinner = () => {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]            // diagonals
  ];
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
      return board.value[a];
    }
  }
  return null;
};

const makeMove = (index: number) => {
  if (board.value[index] || status.value) return; // Cell already filled or game over

  board.value[index] = currentPlayer.value;
  movesCount.value++;

  const winner = checkWinner();
  if (winner) {
    status.value = `Người chiến thắng là: ${winner}!`;
    saveGameResult(winner);
  } else if (movesCount.value === 9) {
    status.value = 'Hòa!';
    saveGameResult('Draw');
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }
};

const saveGameResult = async (winner: string ) => {
  try {
    const result = { winner, moves: movesCount.value };
    await axios.post(apiUrl, result);
    console.log('Game result saved successfully!');
  } catch (error) {
    console.error('Error saving game result:', error);
  }
};

const resetGame = () => {
  board.value = Array(9).fill('');
  currentPlayer.value = 'X';
  status.value = '';
  movesCount.value = 0;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-gap: 5px;
  margin: 20px auto;
  width: 310px;
}
.cell {
  width: 100px;
  height: 100px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
}
</style>
