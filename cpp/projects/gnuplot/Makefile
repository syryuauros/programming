CC			:= g++
CCFLAGS	:= -lboost_iostreams -lboost_system -lboost_filesystem
# CCFLAGS	:= `pkg-config gtkmm-3.0 --cflags --libs`
LDFLAGS	:=

TARGETS	:= mytest
MAINS		:= $(addsuffix .o, $(TARGETS) )
OBJ			:= main.o
DEPS		:=
# OBJ			:= main.o examplewindow.o
# DEPS		:= examplewindow.h


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
