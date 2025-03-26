"""                 
 
                     _________  _                                          _
                    /  ______/ (_)                                        (_)      ________              ___________   ______
                   /  /____   ___   ___      __       _________    __     ___     /  _____/__   __      /  _____   /  /   _   \
                  /____   /__/  /__/   \    /  \_____/  _____  /__/ /____/  /____/  /______\  \/  /___ /  /    /  /__/___/_\___\___
                 _____/  /  /  /  /  /\ \_ / /\ \   /  /____/ /  / /___ /  /___   ____/     \    /    /  /____/  /_________________\
                /_______/   \__\ /__/  \____/  \_\ /  _______/  /_____/ \__\__ /  /         /___/    /_________  \ /___/    \___\
                                                  /__/                      \____/                              \__\

                                                   Chat, Edit, and Autocomplete tutorial                                  
"""


# ———————————————————— Chat [Cmd/Ctrl + L]: Ask "what sorting algorithm is this?" ————————————————————

def sorting_algorithm(x):
    for i in range(len(x)):
        for j in range(len(x) - 1):
            if x[j] > x[j + 1]:
                x[j], x[j + 1] = x[j + 1], x[j]
    return x

# —————————————————— Edit [Cmd/Ctrl + I]: Tell SimplifyQA - AI to "make this more readable" —————————————————

def sorting_algorithm(x):
    for i in range(len(x)):
        for j in range(len(x) - 1):
            if x[j] > x[j + 1]:
                x[j], x[j + 1] = x[j + 1], x[j]
    return x

# ——————————————— Autocomplete [Tab]: Place cursor after `:` below and press [Enter] —————————————————

# Basic assertion for sorting_algorithm:


