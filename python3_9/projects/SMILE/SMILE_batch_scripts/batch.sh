#!/bin/sh
c_path=/mnt/nfs1/projects/SMILE/SMILE_Spectrum_backup/300_rep/
d_path=(
	AS_no_BW_no_AOI70_spectral_res_1nm_OL100%/
	AS_no_BW_no_AOI70_spectral_res_1nm_OL100%/
	AS_no_BW_no_AOI70_spectral_res_1nm_OL100%/
	)
l_d=${#d_path[@]}
code_name=(
	"SMILE_code20221208.py"
	"SMILE_code_to_check_index20221208.py"
	"SMILE_code_to_check_index20221208.py"
	)
index_list=(
	0.000/0.002/0.004/0.008/0.010
	0.000/0.002/0.004/0.008/0.010
	0.000/0.002/0.004/0.008/0.010
	)

for ((i=0; i<=$(($l_d - 1)); i++));
do
#j=$(($i - 1))
sbatch --nodelist=pylon$((($i + 0) % 3 + 1))  $c_path${d_path[$i]}"batch_code.sh" $c_path${d_path[$i]} ${code_name[$i]} ${index_list[$i]} &
sleep 0.3
done
sbatch --nodelist=pylon$(($l_d % 3 + 1))  $c_path${d_path[$((l_d - 1))]}"batch_code.sh" $c_path${d_path[$(($l_d - 1))]} ${code_name[$(($l_d - 1))]} ${index_list[$(($l_d - 1))]}
#sbatch $c_path${d_path[0]}"batch_code.sh" $c_path${d_path[0]} ${code_name[1]}

sleep 1
while [ -n "$(squeue | grep pylon)" ]
do
	sleep 1
done

