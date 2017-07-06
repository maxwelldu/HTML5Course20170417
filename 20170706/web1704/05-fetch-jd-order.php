<?php
$url = "http://order.jd.com/center/list.action";
$cookie = 'unpl=V2_ZzNtbUZWEUdwARNVLx8JAmIKGgkRVhRGJwxFUi8cDwBiVxAKclRCFXMUR1JnGFsUZwUZWEdcQhdFCHZUehhdBWYKF1tBZ3MURQtGZHMpXABvCxBdQ15CHXELRFx8GFkMbgcRWHJnRRFFOAMMK0YUWyNRSxkSCBVXLFB2UH4dWQVlARtfclZzFUVDKFU2GVkNbwESXEtWSxF2Ck5TehxVDGMAF21DZ0A%3d; __jdv=122270672|www.2car8.cn|t_1000108472_|uniongou|50cc48d0e7d6489eb0fbc527e4b44e3f|1499334249317 ; TrackID=1lp0BFOTah-ANkoT25xs_Kzz5Ouscp4jWB7wBraXH3EdbfuvUVxRbBW0itbFLrF_1eyeUCh9ZRBxwGw7c-bIjrasq9NLEdaPladeGt75hESk; pinId=T4JSLnKsn27z8V2XxRxESrV9-x-f3wj7; pin=jd_6c7228918cea0; unick=jd_139940lfv; thor=F53FCC74F632CCA09E37C08DE952A5F01C494FA279DB58CEB5D6E9B4E233D67382EAC47A92B14D762DA205944E0EF6065A2E4AC27732E94BF20B4E47B2B40C45A978B0A4D50BD45B10189E21B1D716CE396825263843E058C93BBC6A8A40E6C17AD8EB4B3EDBF6332680260F7497326301CADF1EC9769BCE39FC1C7D2EE1A325735A1E72EE4ADAD4113CC7E2EB207A73AC6B9D6BEDAC01BBD7885D0DC1F13F95; _tp=MeNHE94GpjmZbGY%2BxI7g%2FDFjNmRUx%2Fwdqtw4B77yHnY%3D; _pst=jd_6c7228918cea0; ceshi3.com =101; __jda=122270672.1499310809523960488524.1499310809.1499325625.1499334236.3; __jdb=122270672.13.1499310809523960488524|3.1499334236; __jdc=122270672; __jdu=1499310809523960488524; 3AB9D23F7A4B3C9B=D624ZKE5OA4TITICPDCUTO4H5YZKPDIJ4TVRBWDIATREIOBTMDAIE4SWU64SLG32DR6FYD2IIS6MSMOJB2XFXNHTOU';
// $cookie = 'user-key=e8c6b150-f5b7-467c-817a-0a923f6accb3; __utmz=122270672.1498095212.1.1.utmcsr=trade.jd.com|utmccn=(referral)|utmcmd=referral|utmcct=/shopping/order/getOrderInfo.action; __jdv=122270672|direct|-|none|-|1498723590397; TrackID=1TO8uu_drgv1xg0184Ud296GeQvyhHzs8tx_H6I9zh-NRX2gJ7fqbL7jrzNLIHO3oIAzM8wzDdOtiJzflDhWW3Q; pinId=6LdhxILovlHHsDqJQzoSug; pin=dcj3sjt_m; _tp=YfJ1I22oknIb8UHZoMWqIA%3D%3D; _pst=dcj3sjt_m; cn=19; ipLoc-djd=1-2806-4188-0.138544953; ipLocation=%u5317%u4eac; wlfstk_smdl=jn79t5oqwcizkfkpjt7q7m40mkukbrxu; _jrda=1; _jrdb=1499334122873; thor=6D2501CC1BE6AC596ECFD49529A5C1ECD7B64CB1BB9CEA9114656317050B562C7D82FEC9B5109F0CED5BB3A4CF65D9BD78DADBCA00E3AC91E316435C03E8DC8D9188D0693A1F8838EB09380D3618F346E6F9A7CD7EE61EC707731D16AEFB75751256272E8D3D4B7334143875F1A20A08C061FB39EFBD2C432C98FA9E5602DAFED837605445C6A38F5C67324EED4F9F45; unick=dcj3sjt; __jda=122270672.14957666848981411990087.1495766684.1499325922.1499334054.14; __jdb=122270672.4.14957666848981411990087|14.1499334054; __jdc=122270672; 3AB9D23F7A4B3C9B=YRDNHW6ZNGD6746ASVIGDS3CXB4ZEV6HNUEUJTTW5OZDVPF5RYOMC6MCPDRFZLYJUJUUAFUJXMY35IKJU3FRGDYQH4; __jdu=14957666848981411990087';
$data = myfopen($url,0,'',$cookie);
echo $data;

function myfopen($url, $limit = 0, $post = '', $cookie = '', $bysocket = FALSE, $ip = '', $timeout = 15, $block = TRUE) {
	$return = '';
	$matches = parse_url($url);
	$host = $matches['host'];
	@$path = $matches['path'] ? $matches['path'].'?'.$matches['query'].'#'.$matches['fragment'] : '/';
	$port = !empty($matches['port']) ? $matches['port'] : 80;

	if($post) {
		$out = "POST $path HTTP/1.0\r\n";
		$out .= "Accept: */*\r\n";
		//$out .= "Referer: $site_url\r\n";
		$out .= "Accept-Language: zh-cn\r\n";
		$out .= "Content-Type: application/x-www-form-urlencoded\r\n";
		$out .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
		$out .= "Host: $host\r\n";
		$out .= 'Content-Length: '.strlen($post)."\r\n";
		$out .= "Connection: Close\r\n";
		$out .= "Cache-Control: no-cache\r\n";
		$out .= "Cookie: $cookie\r\n\r\n";
		$out .= $post;
	} else {
		$out = "GET $path HTTP/1.0\r\n";
		$out .= "Accept: */*\r\n";
		//$out .= "Referer: $site_url\r\n";
		$out .= "Accept-Language: zh-cn\r\n";
		$out .= "User-Agent: $_SERVER[HTTP_USER_AGENT]\r\n";
		$out .= "Host: $host\r\n";
		$out .= "Connection: Close\r\n";
		$out .= "Cookie: $cookie\r\n\r\n";
	}
	$fp = fsockopen(($ip ? $ip : $host), $port, $errno, $errstr, $timeout);
	if(!$fp) {
		return '';
	} else {
		stream_set_blocking($fp, $block);
		stream_set_timeout($fp, $timeout);
		fwrite($fp, $out);
		$status = stream_get_meta_data($fp);
		if(!$status['timed_out']) {
			$firstline=true;
			while (!feof($fp)) {
				$header = @fgets($fp);
				if($firstline && (false===strstr($header,'200')) ){
					return '';
				}
				$firstline=false;
				if( $header  && ($header == "\r\n" ||  $header == "\n") ) {
					break;
				}
			}
			$stop = false;
			while(!feof($fp) && !$stop) {
				$data = fread($fp, ($limit == 0 || $limit > 8192 ? 8192 : $limit));
				$return .= $data;
				if($limit) {
					$limit -= strlen($data);
					$stop = $limit <= 0;
				}
			}
		}
		@fclose($fp);
		return $return;
	}
}
?>
