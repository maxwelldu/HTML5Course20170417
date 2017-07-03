 $(function() {
     $.get(
         'js/ChinaArea.xml',
         '',
         function (res) {
             xmldom = $(res);
             xmldom.find('province').each(function (index, el) {
                 var pro_name = $(el).attr('province');
                 var pro_ID = $(el).attr('provinceID');
                 $('<option value="' + pro_ID + '">' + pro_name + '</option>').appendTo('#province');

                 //监视省份变化
                 $('#province').change(function () {
                     var pro_id = $(this).val();

                     var pro_two = pro_id.substr(0, 2);
                     var citys = xmldom.find('City');

                     $('#city').empty().append('<option value="0">-请选择-</option>');
                     citys.each(function (index, el) {
                         var city_two = $(el).attr('CityID').substr(0, 2);
                         if (pro_two == city_two) {
                             var city_id = $(el).attr('CityID');
                             var city_name = $(el).attr('City');
                             $('<option value="' + city_id + '">' + city_name + '</option>').appendTo('#city');
                         }
                     })
                 })
                 //监视市发生改变
                 $('#city').change(function () {
                     var city_id = $(this).val();
                     var city_four = city_id.substr(0, 4);

                     var areas = xmldom.find('Piecearea');
                     $('#district').empty().append('<option value="0">-请选择-</option>');
                     areas.each(function (index, el) {
                         var area_four = $(el).attr('PieceareaID').substr(0, 4);
                         if (city_four == area_four) {
                             var area_id = $(el).attr('PieceareaID');
                             var area_name = $(el).attr('Piecearea');
                             $('<option value="' + area_id + '">' + area_name + '</option>').appendTo('#district')
                         }
                     })
                 })
             })
         }
     )
 });

