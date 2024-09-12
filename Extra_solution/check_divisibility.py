def check_divisibility(number, k):
    """Check if number % k == k-1"""
    return number % k == k - 1

def find_hex_number_with_conditions():
    hex_number = []
    k = 1

    while True:
        # Add a new hex digit from 0 to F
        for digit in range(16):
            temp_hex = hex_number + [digit]
            number = int("".join([hex(d)[2:] for d in temp_hex]), 16)
            
            # Check the condition for divisibility
            if check_divisibility(number, k):
                hex_number = temp_hex
                k += 1
                break
        
        # Check if we are at the middle digit and if it's 3
        if len(hex_number) % 2 == 1 and hex_number[len(hex_number) // 2] != 3:
            # Set the middle digit to 3
            hex_number[len(hex_number) // 2] = 3
            
        # Optionally, stop at a reasonable size
        if k > 15:
            break
    
    return "".join([hex(d)[2:] for d in hex_number])

# Find the hex number
result = find_hex_number_with_conditions()
print(f"Hex number: {result}")
