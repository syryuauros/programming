#!/bin/sh
c_path=/mnt/nfs1/projects/SMILE/SMILE_Spectrum_backup/100_rep/partially_reduced/SE_a_b_with_NA/
d_path=(
	NA0_SE/
	NA2_SE/
	NA3_SE/
	NA5_SE/
	)
l_d=${#d_path[@]}
code_name=(
	"SMILE_code20221208.py"
	"SMILE_code20221208.py"
	"SMILE_code20221208.py"
	"SMILE_code20221208.py"
	)
index_list=(
	0.010/0.020/0.030
	0.010/0.020/0.030
	0.010/0.020/0.030
	0.010/0.020/0.030
	)

for ((i=0; i<=$(($l_d - 2)); i++));
do
#j=$(($i - 1))
sbatch --nodelist=pylon$((($i + 0) % 3 + 1))  $c_path${d_path[$i]}"batch_code.sh" $c_path${d_path[$i]} ${code_name[$i]} ${index_list[$i]} &
sleep 0.3
done
sbatch --nodelist=pylon$((($l_d - 1) % 3 + 1))  $c_path${d_path[$((l_d - 1))]}"batch_code.sh" $c_path${d_path[$(($l_d - 1))]} ${code_name[$(($l_d - 1))]} ${index_list[$(($l_d - 1))]}
#sbatch $c_path${d_path[0]}"batch_code.sh" $c_path${d_path[0]} ${code_name[1]}

sleep 1
while [ -n "$(squeue | grep pylon)" ]
do
	sleep 1
done
