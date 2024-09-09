from GameRules import GameRules


class HelpTable:
    @staticmethod
    def generate_table(moves):
        num_moves = len(moves)
        table = [["" for _ in range(num_moves + 1)] for _ in range(num_moves + 1)]

        # Create the header row
        table[0][0] = "v PC/User >"
        for i in range(1, num_moves + 1):
            table[0][i] = moves[i-1].capitalize()
            table[i][0] = moves[i-1].capitalize()

        rules = GameRules(moves)

        for i in range(1, num_moves + 1):
            for j in range(1, num_moves + 1):
                if i == j:
                    table[i][j] = "Draw"
                else:
                    table[i][j] = "Win" if rules.determine_winner(moves[i-1], moves[j-1]) == "You win!" else "Lose"

        return table

    @staticmethod
    def print_table(table):
        print("\nHere is the result table from the user's point of view:")
        print("For example, if you pick 'Rock' and the PC picks 'Scissors', you win.\n")

        # Determine column widths
        col_widths = [max(len(str(col)) for col in row) for row in zip(*table)]

        # Draw the table with borders and correct formatting
        border = "+-" + "-+-".join(["-" * width for width in col_widths]) + "-+"
        print(border)
        for row in table:
            print("| " + " | ".join(col.ljust(width) for col, width in zip(row, col_widths)) + " |")
            print(border)

if __name__ == "__main__":
    moves = ["rock", "paper", "3rd move", "4th", "5th"]  # Adjust the list of moves as needed
    table = HelpTable.generate_table(moves)
    HelpTable.print_table(table)
