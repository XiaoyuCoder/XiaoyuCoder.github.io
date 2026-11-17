// 2024 城镇居民人均可支配收入（元/年）；2024 年 12 月普通住宅样本平均套租金（元/月）。
export const rentSource = 'https://pdf.dfcfw.com/pdf/H3_AP202501141641916270_1.pdf#page=11';
const sources = {
  wuhan: ['武昌区统计局：2024 年经济社会发展统计资料，第 139 页', 'https://www.wuchang.gov.cn/zwgk_37/fdzdgknr/tjxx/tjnj/202508/P020250924570431094088.pdf#page=147'],
  suzhou: ['苏州市统计局：2024 年统计公报', 'https://tjj.suzhou.gov.cn/sztjj/tjgb/202504/c77512c90a144784beba4870a6b5cc0d.shtml'],
  wuxi: ['无锡市人民政府：2024 年统计公报', 'https://www.wuxi.gov.cn/doc/2025/04/28/4554447.shtml'],
  fuzhou: ['福州市统计局：2024 年统计公报', 'https://tjj.fuzhou.gov.cn/zwgk/tjzl/ndbg/202504/t20250403_4999354.htm'],
  changsha: ['湖南省统计局：长沙市 2024 年统计公报', 'https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/szgb/zss_1/202505/t20250516_33673433.html'],
  wenzhou: ['国家统计局温州调查队：2024 年统计公报', 'https://zjzd.stats.gov.cn/gjtjjwzdcd/dcsj/tjgb/art/2025/art_7b8471c3a2ac4c2e8a557826ea1451c6.html'],
  jiaxing: ['国家统计局嘉兴调查队：2024 年城镇居民收入', 'https://zjzd.stats.gov.cn/gjtjjjxdcd/dcfx/art/2025/art_130505ce63f0466c88222161dc79c99e.html'],
  shaoxing: ['国家统计局绍兴调查队：2024 年统计公报', 'https://zjzd.stats.gov.cn/gjtjjsxdcd/dccg/njgb/art/2025/art_e9ec30594848431cbdeba82fd3bfe93f.html'],
  nantong: ['南通市人民政府：2024 年统计公报', 'https://www.nantong.gov.cn/ntsrmzf/tjgb2/content/518a2c15-df46-48a8-9e84-7cc864ce8873.html'],
  changzhou: ['国家统计局常州调查队：2024 年城镇居民收入', 'https://gdd.changzhou.gov.cn/content/suitable/show?catid=1575&id=6981'],
  hefei: ['亳州市统计局：2024 年全省各市主要指标', 'https://tj.bozhou.gov.cn/file_bz/27/202504/202504076e39c4e7a45940b2b38c95d6d2da12bb.pdf'],
  foshan: ['佛山市 2024 年统计公报（佛山日报刊载）', 'https://epaper1.fsonline.com.cn/fsrb/resfile/2025-04-26/A03/fsrb20250426A03.pdf'],
  dongguan: ['东莞市统计局：2024 年统计公报', 'https://tjj.dg.gov.cn/zfxxgkml/tjxx/content/post_4373918.html'],
  kunming: ['玉溪市统计年鉴：2024 年各州市收入', 'https://m.yuxi.gov.cn/u/cms/yxszfxxgk/202601/05181012stvh.pdf'],
  guiyang: ['贵阳市统计局：2024 年经济运行情况（新浪转载）', 'https://finance.sina.com.cn/wm/2025-01-24/doc-inehaiaa2734627.shtml'],
  nanning: ['南宁市 2024 年统计公报（中国网刊载）', 'https://nanning.china.com.cn/2025-05/16/content_43118751.htm'],
  zhengzhou: ['郑州市统计局：2024 年统计公报', 'https://tjj.zhengzhou.gov.cn/tjgb/9230847.jhtml'],
  haerbin: ['哈尔滨市 2024 年统计公报（年鉴网站收录）', 'https://www.zgtjnj.org/tjgbimg/2025/2024%E5%B9%B4%E5%93%88%E5%B0%94%E6%BB%A8%E5%B8%82%E5%9B%BD%E6%B0%91%E7%BB%8F%E6%B5%8E%E5%92%8C%E7%A4%BE%E4%BC%9A%E5%8F%91%E5%B1%95%E7%BB%9F%E8%AE%A1%E5%85%AC%E6%8A%A5.pdf'],
  changchun: ['吉林省统计局：长春市 2024 年统计公报', 'https://tjj.jl.gov.cn/tjsj/tjgb/ndgb/202508/t20250806_3488044.html'],
  yinchuan: ['银川市人民政府：2024 年统计公报', 'https://yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202504/t20250430_4897469.html'],
  sanya: ['三亚市统计局：2024 年统计公报', 'https://tjj.sanya.gov.cn/tjjsite/tjgb/202502/c72b7d2391094f43bcf85ec2bd223f65.shtml'],
  zhuhai: ['珠海市 2024 年统计公报（珠海特区报刊载）', 'https://pub-zhtb.hizh.cn/a/202505/26/AP6833512de4b01af7bf1ae942.html'],
  haikou: ['海口市 2024 年统计公报（海口日报刊载）', 'https://szb.hkwb.net/epaper/xml/hkrb/20250327/A05B20250327C.pdf'],
  quanzhou: ['泉州市统计局：2024 年统计公报', 'https://tjj.quanzhou.gov.cn/zwgk/zfxxgk/fdzdgknr/tjxx/tjgb/202503/t20250331_3153809.htm'],
  wulumuqi: ['精河县人民政府：2024 年新疆各地居民收入', 'https://www.xjjh.gov.cn/xjjh/c127410/202502/be5c9d47833046408f1a225485a674d2.shtml'],
  xining: ['西宁市 2024 年民生数据（人民网刊载）', 'https://qh.people.com.cn/n2/2025/0121/c182775-41115365.html'],
  lanzhou: ['甘肃省统计局：2024 年各市经济指标', 'https://tjj.gansu.gov.cn/tjj/c117468/202505/174143566/files/b46bda090ad947cfa645f6cb8398e656.pdf'],
  nanchang: ['国盛证券：江西省各市 2024 年城镇居民收入（新浪转载）', 'https://finance.sina.com.cn/roll/2025-06-26/doc-infcktkp3619779.shtml'],
  shijiazhuang: ['石家庄市人民政府：2024 年统计公报', 'https://www.sjz.gov.cn/columns/8e2f0b12-4574-4ced-b339-bcb378d54b2d/202504/19/b09d4f25-7926-46a5-b88e-c95ea9a9eb14.html'],
  huizhou: ['惠州市 2024 年统计公报（公报原文收录）', 'https://zgrkk.com/pdf/61566/1746623734-5518358.pdf'],
  huhehaote: ['呼和浩特市 2024 年统计公报（呼和浩特日报刊载）', 'https://static.0471tv.org.cn/rb/pc/con/202504/03/content_82339.html'],
  taiyuan: ['太原市 2024 年统计公报（Maptable 收录）', 'https://maptable.com/tjgb/2024/%E5%B1%B1%E8%A5%BF%E7%9C%81/%E5%A4%AA%E5%8E%9F%E5%B8%82/report/shan-xi-sheng-tai-yuan-shi-2024-nian-guo-min-jing-ji-he-she-hui-fa-zhan-tong-ji-gong-bao-2'],
  xuzhou: ['江苏省人民政府：徐州市 2024 年经济运行情况', 'https://www.jiangsu.gov.cn/art/2025/2/5/art_84324_11490817.html'],
  beihai: ['广西壮族自治区海洋局：北海市 2024 年经济数据', 'https://hyj.gxzf.gov.cn/zwgk_66846/tzgg/P020250610350347659091.pdf'],
  lasa: ['拉萨市人民政府：2024 年经济运行情况', 'https://www.lasa.gov.cn/lasa/lsyw/202504/25374ef786714192bc3fd915b4e3cbd7.shtml'],
  zhejiang: ['浙江各市 2024 年经济指标汇编', 'https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web2518/site/attach/0/45bff06bcf2b4abaad87825b3a4bdc51.pdf'],
  yantai: ['烟台市 2024 年统计公报', 'https://www.yantai.gov.cn/art/2025/4/9/art_43176_3248210.html'],
  luoyang: ['洛阳市 2024 年统计公报', 'https://www.ly.gov.cn/2025/04-30/565379.html'],
  zhuzhou: ['株洲市 2024 年统计公报', 'https://tjj.hunan.gov.cn/hntj/tjfx/tjgb/szgb/zzs_1/202504/t20250408_33633598.html'],
  hengyang: ['衡阳市 2024 年统计公报', 'https://www.hengyang.gov.cn/hystjj/tjgb/20250402/i3623481.html'],
  nanyang: ['南阳市 2024 年统计公报', 'https://tj.nanyang.gov.cn/2025/04-11/1032596.html'],
  zhanjiang: ['湛江市 2024 年统计公报', 'https://www.zhanjiang.gov.cn/zjsfw/bmdh/tjxxw/zwgk/tjsjzl/content/mpost_2026439.html']
};
// name, annual income, under 30 m², 30–60 m², income source key
const rows = [
 ['北京',92464,2162,4741,'wuhan'], ['上海',93095,1734,4006,'wuhan'],
 ['深圳',81123,1555,3787,'wuhan'], ['广州',83436,1093,2500,'wuhan'],
 ['杭州',83356,1170,2856,'wuhan'], ['南京',83084,904,2454,'wuhan'],
 ['成都',57023,675,1812,'wuhan'], ['武汉',64346,654,1583,'wuhan'],
 ['天津',57705,910,1704,'wuhan'], ['重庆',49778,635,1341,'wuhan'],
 ['青岛',68813,702,1623,'wuhan'], ['济南',65364,597,1452,'wuhan'],
 ['厦门',76118,1021,2155,'wuhan'], ['大连',56212,652,1534,'wuhan'],
 ['沈阳',56117,523,1281,'wuhan'], ['宁波',83110,854,1793,'wuhan'],
 ['西安',53678,608,1518,'wuhan'], ['苏州',86640,874,1925,'suzhou'],
 ['无锡',80003,708,1513,'wuxi'], ['福州',60758,1006,1847,'fuzhou'],
 ['长沙',69658,637,1500,'changsha'], ['温州',81527,1103,1474,'wenzhou'],
 ['嘉兴',78641,null,1224,'jiaxing'], ['绍兴',83579,null,1476,'shaoxing'],
 ['南通',65457,549,1279,'nantong'], ['常州',75003,566,1402,'changzhou'],
 ['合肥',62685,656,1440,'hefei'], ['佛山',70088,768,1359,'foshan'],
 ['东莞',69769,836,1430,'dongguan'], ['昆明',57444,531,1278,'kunming'],
 ['贵阳',50576,592,1171,'guiyang'], ['南宁',46381,533,1201,'nanning'],
 ['郑州',50494.3,537,1153,'zhengzhou'], ['哈尔滨',48216,723,1205,'haerbin'],
 ['长春',42350,595,1229,'changchun'], ['银川',49164,407,1021,'yinchuan'],
 ['三亚',47666,null,2213,'sanya'], ['珠海',70052,null,2233,'zhuhai'],
 ['海口',48132,null,1596,'haikou'], ['泉州',63594,null,1230,'quanzhou'],
 ['乌鲁木齐',51779,null,1536,'wulumuqi'], ['西宁',43803,null,1550,'xining'],
 ['兰州',50489,null,1215,'lanzhou'], ['南昌',57294,693,1312,'nanchang'],
 ['石家庄',49990,520,1084,'shijiazhuang'], ['惠州',54572,null,1116,'huizhou'],
 ['呼和浩特',59540,null,1302,'huhehaote'], ['太原',47930,518,907,'taiyuan'],
 ['徐州',46936,null,956,'xuzhou'], ['北海',45542,null,699,'beihai'],
 ['拉萨',58171,null,null,'lasa'],
 ['金华',76866,null,null,'zhejiang'], ['湖州',77551,null,null,'zhejiang'],
 ['台州',77582,null,null,'zhejiang'], ['舟山',79416,null,null,'zhejiang'],
 ['衢州',63556,null,null,'zhejiang'], ['丽水',61629,null,null,'zhejiang'],
 ['烟台',62060,null,null,'yantai'], ['洛阳',47922,null,null,'luoyang'],
 ['株洲',59167,null,null,'zhuzhou'], ['衡阳',47927,null,null,'hengyang'],
 ['南阳',41924,null,null,'nanyang'], ['湛江',38452,null,null,'zhanjiang']
];
// 表 6 的另外三个面积档；无值表示报告未公布或城市未覆盖。
const largerRents = {
 深圳:[5911,8378,22187], 北京:[5435,7864,23118], 上海:[5165,8227,21081], 杭州:[3931,5135,10325], 广州:[3749,4671,11878],
 厦门:[3145,4213,8096], 三亚:[3036,4378,11286], 珠海:[2890,3560,7115], 南京:[2808,3589,8135], 苏州:[2691,3489,6682],
 福州:[2527,3316,5573], 成都:[2460,3154,7104], 宁波:[2437,3452,5715], 海口:[2283,2907,4954], 天津:[2124,2689,6782],
 武汉:[2095,2623,5738], 佛山:[2078,2445,4246], 西安:[2076,2548,4948], 长沙:[2073,2679,4652], 大连:[2070,3052,6864],
 东莞:[2057,2611,4418], 无锡:[2030,2602,4841], 合肥:[2021,2579,5008], 青岛:[2009,2566,6783], 温州:[1980,2714,4312],
 泉州:[1958,2473,4453], 济南:[1875,2381,4156], 嘉兴:[1839,2362,null], 常州:[1836,2393,4334], 重庆:[1835,2476,5069],
 南宁:[1834,2347,4532], 绍兴:[1822,2085,3436], 乌鲁木齐:[1775,2347,4572], 昆明:[1736,2179,3898], 郑州:[1689,2063,3928],
 西宁:[1674,2073,null], 兰州:[1663,2265,4525], 哈尔滨:[1639,2322,4682], 沈阳:[1626,2267,4890], 南昌:[1612,2271,3899],
 贵阳:[1608,2205,3607], 石家庄:[1566,2002,3654], 长春:[1557,2174,4465], 南通:[1556,2051,3509], 惠州:[1544,1984,3299],
 呼和浩特:[1380,1808,3436], 太原:[1361,1939,3916], 徐州:[1352,1739,3094], 银川:[1060,1432,3000], 北海:[994,1167,null]
};
// 2024 年 GDP 初步核算数（亿元）：前 50 名依据各地统计局数据汇编；其他城市见下方各地资料。
export const gdpRankingSource = ['2024 年城市 GDP 前 50 名汇编（聚汇数据，原始数据来自各市统计局）', 'https://gdp.gotohui.com/topic-4621'];
const gdp = {
 北京:49843.1, 上海:53926.71, 天津:18024.32, 重庆:32193.15, 深圳:36801.87, 广州:31032.5,
 苏州:26727, 成都:23511.3, 杭州:21860.32, 武汉:21106.23, 南京:18500.81, 宁波:18147.7,
 青岛:16719.46, 无锡:16263.29, 长沙:15268.78, 郑州:14532.1, 福州:14236.76, 济南:13527.55,
 合肥:13507.7, 佛山:13361.9, 西安:13317.78, 泉州:13094.87, 南通:12421.9, 东莞:12282.15,
 常州:10813.6, 温州:9718.85, 徐州:9537.12, 大连:9516.9, 沈阳:9027.1, 厦门:8589.01,
 绍兴:8368.6, 昆明:8275.22, 石家庄:8203.4, 南昌:7800.37, 长春:7632.19, 嘉兴:7569.53,
 惠州:6136.39, 哈尔滨:6016.3, 南宁:5995.36, 贵阳:5777.41, 太原:5418.87, 乌鲁木齐:4502.16,
 珠海:4479.06, 呼和浩特:4107.08, 兰州:3742.3, 银川:2939.53, 海口:2470.63, 北海:1888.04,
 西宁:1862.09, 三亚:1004.70, 拉萨:990.04, 金华:6925.5, 湖州:4213.4, 台州:6656.4, 舟山:2226.2, 衢州:2262.8, 丽水:2181.2,
 烟台:10782.83, 洛阳:5818.6, 株洲:3902.4, 衡阳:4491.69, 南阳:4879.08, 湛江:3839.93
};
const capitals = new Set(['广州','成都','杭州','武汉','南京','长沙','郑州','福州','济南','合肥','西安','沈阳','昆明','石家庄','南昌','长春','哈尔滨','南宁','贵阳','太原','乌鲁木齐','呼和浩特','兰州','银川','海口','西宁','拉萨']);
const municipalities = new Set(['北京','上海','天津','重庆']);
const gdpSources = {
 哈尔滨: ['哈尔滨市 2024 年统计公报', 'https://www.tjnj.net/tjgbimg/2025/2024%E5%B9%B4%E5%93%88%E5%B0%94%E6%BB%A8%E5%B8%82%E5%9B%BD%E6%B0%91%E7%BB%8F%E6%B5%8E%E5%92%8C%E7%A4%BE%E4%BC%9A%E5%8F%91%E5%B1%95%E7%BB%9F%E8%AE%A1%E5%85%AC%E6%8A%A5.pdf'],
 南宁: sources.nanning, 贵阳: sources.guiyang, 太原: sources.taiyuan,
 乌鲁木齐: ['乌鲁木齐市统计局：2024 年经济运行情况', 'https://www.gqp.gov.cn/gqbkfq/c120309/202502/f388f3c7b5934d0aaebb610069d29487.shtml'],
 珠海: sources.zhuhai, 呼和浩特: sources.huhehaote,
 兰州: ['兰州市 2024 年统计公报', 'https://manage.gsei.com.cn/html/1288/2025-10-13/content-626780.html'],
 银川: sources.yinchuan, 海口: sources.haikou, 北海: sources.beihai,
 西宁: ['西宁市 2024 年统计公报（西宁晚报刊载）', 'https://epaper.tibet3.com/xhdsb/html/202501/26/26a279a6-6e67-4d44-8dc4-3282f1631198.pdf'],
 三亚: sources.sanya, 拉萨: sources.lasa,
 金华:sources.zhejiang, 湖州:sources.zhejiang, 台州:sources.zhejiang, 舟山:sources.zhejiang, 衢州:sources.zhejiang, 丽水:sources.zhejiang,
 烟台:sources.yantai, 洛阳:sources.luoyang, 株洲:sources.zhuzhou, 衡阳:sources.hengyang, 南阳:sources.nanyang, 湛江:sources.zhanjiang
};
export const cities = rows.map(([name, income, small, medium, key]) => ({
 name, income, rents: {small, medium, large: largerRents[name]?.[0] ?? null, family: largerRents[name]?.[1] ?? null, extra: largerRents[name]?.[2] ?? null}, source: sources[key], gdp: gdp[name], gdpSource: gdpSources[name] || gdpRankingSource,
 category: municipalities.has(name) ? 'municipal' : capitals.has(name) ? 'capital' : 'other',
 note: name === '重庆' ? '租金覆盖主城区，收入覆盖全市城镇居民，地域范围不同。' : '',
 rentMissing: !largerRents[name] ? '该城市不在中指研究院 50 城报告的覆盖范围内，暂无可比租金数据。' : '该面积档的租金因样本较少未公布，可切换面积查看。'
}));
