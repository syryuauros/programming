CC			:= g++
CCFLAGS	:=
LDFLAGS	:= -static

TARGETS	:= test
MAINS		:= $(addsuffix .o, $(TARGETS) )
OBJ			:= main.o my.o
DEPS		:= my.h

.PHONY: all clean

all: $(TARGETS)

clean:
		rm -f $(TARGETS) $(OBJ)

$(OBJ): %.o : %.cpp $(DEPS)
		$(CC) -c -o $@ $< $(CCFLAGS)

$(TARGETS): % : $(OBJ)
	$(CC) -o $@ $(LIBS) $^ $(CCFLAGS) $(LDFLAGS)

# $(TARGETS): % : $(OBJ) %.o
# 		$(CC) -o $@ $^ $(CCFLAGS) $(LDFLAGS)
