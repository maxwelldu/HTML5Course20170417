<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <?php
      $students = array('赵', "常", "明");
      for ($i = 0; $i < count($students); $i++) {
        echo "<h2>" . $students[$i] . "</h2>";
      }
      echo "<h2>2017" . " 07 06</h2>";
     ?>
     <h2>2017</h2>


     <select>
       <?php for ($i = 1997; $i < 2017; $i++) { ?>
         <option><?php echo $i; ?></option>
       <?php } ?>
     </select>

     <?php
      echo "<select>";
      for ($i = 1997; $i < 2017; $i++) {
        echo '<option>';
        echo $i;
        echo '</option>';
      }
      echo "</select>";
     ?>

     <?php
      echo "晓磊";
      //变量
      /*注释*/
      $name = "晓磊";
      echo $name;
      $age = 17;
      echo $age;
      echo "<br />";
      // echo $name . "的年龄是" . $age;
      echo $name;
      echo "的年龄是";
      echo $age;

      for ($i = 0; $i < 10; $i++) {
        echo $name . "的年龄是" . $age . "<br />";
      }

      //PHP是弱类型语言
      $name = "子浩兄";
      echo $name;
      $name = true;
      echo $name;

      //JS是弱类型语言

      //java
      // int age = 10;
      // age = '子浩';//报错
     ?>
     <?php
        //变量作用域
        $web1704_changquery = 16;
        function showChangQuery() {
          // $web1704_changquery = 18;
          global $web1704_changquery;
          echo $web1704_changquery;
        }
        showChangQuery();

        //运算符
        echo 3 + 8 * 5 / 2 % 8; //7
        echo 3 . "8" * 2; //316
        echo '<br />';
        echo 3 . "8"; //字符串38
        echo "38" + 2;//相加得40
        echo 3 . "8" + 2;
        echo '<br />';
        echo true;
        echo '<br />';
        echo false;
        echo '<br />';
        echo true && !false || false;//true 1
        echo '<br />';
        echo '38' == 38;
        echo '<br />';

        $age = 17;
        $newage = $age++ + ++$age + $age;
        echo $newage;//55 17 + 19 + 19
        //相当于echo $age; $age = $age + 1;
        echo $age++;
        //相当于$age = $age + 1; echo $age;
        echo ++$age;

        //数组
        $classes = array('北京','武汉','西安',' 长沙');
        var_dump( $classes );

        echo '<pre>';
        print_r( $classes );
        echo '</pre>';

        echo count($classes);

        echo '<ul>';
        for ($i = 0; $i < count($classes); $i++) {
          echo "<li><h3>{$i}</h3><span>{$classes[$i]}</span></li>";
        }
        echo '</ul>';

        //隔行换色
        echo '<table>';
        for ($i = 0; $i < 10; $i++) {
          $class = "";
          if ($i % 2 == 0) {
            $class = 'skyblue';
          }
          echo "<tr class='{$class}'><td>word 世界</td></tr>";
        }
        echo '</table>';
     ?>
     <style media="screen">
      .skyblue { background: yellowgreen; }
      .orange { background: greenyellow; }
     </style>

     <table border="1">
       <?php for($i = 0; $i < 10; $i++) { ?>
        <tr <?php if($i % 2 === 0) echo 'class="orange"'?>>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <?php }?>
     </table>




  </body>
</html>
