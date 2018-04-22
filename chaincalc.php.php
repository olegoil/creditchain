<?php

$myDebts = array();

array_push($myDebts, array('2345', 'Node', 5));
array_push($myDebts, array('3456', 'Js', 3));
array_push($myDebts, array('4567', 'Net', 2));
array_push($myDebts, array('5678', 'Ruby', 6));
array_push($myDebts, array('6789', 'Win', 7));
array_push($myDebts, array('7890', 'Corp', 1));
array_push($myDebts, array('8901', 'Phpx', 7));
array_push($myDebts, array('9012', 'Java', 8));
array_push($myDebts, array('0123', 'Gogo', 9));

$myID = '1234';
$lines = [];
$chainsarr = array();
// READ FILE
$myfile = fopen("debts.txt", "r") or die("Unable to open file!");
if($myfile) {
    // FILE LINES TO ARRAY
    while(!feof($myfile)) {
        $lines[] = trim(fgets($myfile));
    }
    // LOOP MY DEBTS
    for($i=0;$i<count($myDebts);$i++) {
        // LOOP SEARCH DEBTS-CHAIN OR MY DEBTS
        checkDebts($myDebts[$i], $chainsarr, 0);
    }
    sleep(5);
}
else {
    echo 'error';
}
// fclose($myfile);
// fclose($myfile2);

function checkDebts($compid, $chainsarr, $start) {
    global $chains;
    global $myID;
    global $lines;
    if(count($chainsarr) == 0 && $start == 0) {
        unset($chainsarr);
        $chainsarr = array();
        array_push($chainsarr, $myID);
    }
    array_push($chainsarr, trim(implode(',',$compid)));
    // echo json_encode($chainsarr) . '<br/>';
    $start = $start+1;
    $found = 0;
    $chain = trim(implode(',',$chainsarr));
    for($m=0;$m<count($lines);$m++) {
        if($chain == $lines[$m]) {
            $found = 1;
        }
        if($found == 0 && $m == count($lines)-1) {
            file_put_contents('debts.txt', "\n".trim($chain), FILE_APPEND);
        }
        $linecnt = explode(',', $lines[$m]);
        if(trim($linecnt[0]) == trim($compid[0])) {
            $one = 0;
            $two = 0;
            $tree = 0;
            $linelenght = count($linecnt);
            for($v=0;$v<$linelenght;$v++) {
                // echo $linecnt[0] . ' | ' . $linecnt[$v] . '<br/>';
                if($v > 0) {
                    if($v == 1) {
                        $one = $v;
                        $two = $v+1;
                        $tree = $v+2;
                    }
                    else {
                        $one += 3;
                        $two += 3;
                        $tree += 3;
                    }

                    $newarr = array();
                    if(isset($linecnt[$one])) {
                        array_push($newarr, $linecnt[$one]);
                        array_push($newarr, $linecnt[$two]);
                        array_push($newarr, $linecnt[$tree]);
                        checkDebts($newarr, $chainsarr, $start);
                    }
                }
            }
        }
        // echo $linecnt;
    }
}

// echo json_encode($chains);

// for($i=count($myDebts);$i<count($myDebts);$i++) {
    
// }

?>