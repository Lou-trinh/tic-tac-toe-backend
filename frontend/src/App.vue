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
import { ref } from 'vue'; // Nhập ref từ Vue để quản lý trạng thái phản hồi (reactive state)
import axios from 'axios'; // Nhập axios để thực hiện các yêu cầu HTTP tới backend

// Khởi tạo một mảng phản hồi đại diện cho bàn cờ Tic-Tac-Toe 3x3, ban đầu chứa các chuỗi rỗng
const board = ref(Array(9).fill(''));

// Theo dõi người chơi hiện tại ('X' hoặc 'O'), bắt đầu với 'X'
const currentPlayer = ref('X');

// Lưu trữ thông báo trạng thái trò chơi (ví dụ: người thắng hoặc hòa), ban đầu rỗng
const status = ref('');

// Đếm số lượt đi trong trò chơi, bắt đầu từ 0
const movesCount = ref(0);

// Xác định URL API backend để lưu kết quả trò chơi
const apiUrl = 'https://tic-tac-toe-backend-production-8fc6.up.railway.app/games'; // URL backend sản xuất
// const apiUrl = 'http://localhost:3000/games'; // URL phát triển cục bộ (đã được bình luận)


// Hàm kiểm tra xem có người chiến thắng hay không bằng cách đánh giá các tổ hợp chiến thắng
const checkWinner = () => {
  // Xác định tất cả các tổ hợp chiến thắng (hàng, cột, đường chéo)
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Hàng
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cột
    [0, 4, 8], [2, 4, 6]            // Đường chéo
  ];

  // Lặp qua từng tổ hợp chiến thắng
  for (const combo of winningCombos) {
    const [a, b, c] = combo; // Phân rã các chỉ số của tổ hợp
    // Kiểm tra xem các ô trong tổ hợp có không rỗng và giống nhau không
    if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) {
      return board.value[a]; // Trả về người chiến thắng ('X' hoặc 'O')
    }
  }
  return null; // Trả về null nếu không có người chiến thắng
};

// Hàm xử lý lượt đi của người chơi
const makeMove = (index: number) => {
  // Ngăn chặn lượt đi nếu ô đã được điền hoặc trò chơi đã kết thúc
  if (board.value[index] || status.value) return;

  // Đặt ký hiệu của người chơi hiện tại ('X' hoặc 'O') vào ô được chọn
  board.value[index] = currentPlayer.value;
  movesCount.value++; // Tăng bộ đếm lượt đi

  // Kiểm tra người chiến thắng sau lượt đi
  const winner = checkWinner();
  if (winner) {
    // Nếu có người chiến thắng, cập nhật trạng thái và lưu kết quả trò chơi
    status.value = `Người chiến thắng là: ${winner}!`; // Hiển thị thông báo chiến thắng
    saveGameResult(winner); // Lưu kết quả vào backend
  } else if (movesCount.value === 9) {
    // Nếu tất cả các ô đã được điền (9 lượt) và không có người thắng, tuyên bố hòa
    status.value = 'Hòa!';
    saveGameResult('Draw'); // Lưu kết quả hòa vào backend
  } else {
    // Chuyển sang người chơi khác nếu trò chơi tiếp tục
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }
};

// Hàm lưu kết quả trò chơi vào backend
const saveGameResult = async (winner: string) => {
  try {
    // Tạo đối tượng kết quả với người thắng và số lượt đi
    const result = { winner, moves: movesCount.value };
    // Gửi yêu cầu POST đến API backend để lưu kết quả
    await axios.post(apiUrl, result);
    console.log('Kết quả trò chơi đã được lưu thành công!');
  } catch (error) {
    // Xử lý lỗi nếu việc lưu kết quả thất bại
    console.error('Lỗi khi lưu kết quả trò chơi:', error);
  }
};

// Hàm đặt lại trò chơi về trạng thái ban đầu
const resetGame = () => {
  board.value = Array(9).fill(''); // Xóa bàn cờ
  currentPlayer.value = 'X'; // Đặt lại người chơi là 'X'
  status.value = ''; // Xóa thông báo trạng thái
  movesCount.value = 0; // Đặt lại bộ đếm lượt đi
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
