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
  yinchuan: ['银川市人民政府：2024 年统计公报', 'https://yinchuan.gov.cn/xxgk/bmxxgkml/stjj/xxgkml_2517/tjxx_7670/tjgb_7671/202504/t20250430_4897469.html']
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
 ['长春',42350,595,1229,'changchun'], ['银川',49164,407,1021,'yinchuan']
];
export const cities = rows.map(([name, income, small, medium, key]) => ({name, income, rents: {small, medium}, source: sources[key], note: name === '重庆' ? '租金覆盖主城区，收入覆盖全市城镇居民，地域范围不同。' : ''}));
