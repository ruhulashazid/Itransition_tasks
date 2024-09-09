class GameRules:
    def __init__(self, moves):
        self.moves = moves
        self.num_moves = len(moves)

    def determine_winner(self, user_move, computer_move):
        if user_move == computer_move:
            return "Draw"

        user_index = self.moves.index(user_move)
        computer_index = self.moves.index(computer_move)

        half = (self.num_moves - 1) // 2

        if (computer_index > user_index and computer_index <= user_index + half) or \
           (computer_index < user_index and user_index - computer_index > half):
            return "Computer wins!"
        else:
            return "You win!"
