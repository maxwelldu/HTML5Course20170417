<?php
// sleep(60);
var_dump($_FILES);

// move_uploaded_file($_FILES["image"]["tmp_name"],
      // "upload/" . $_FILES["image"]["name"]);
      move_uploaded_file($_FILES['image']['tmp_name'], 'upload/mm.jpg');
 ?>
