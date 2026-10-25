/* v6 additions: original exercises, not quotations or an official answer key.
   Anchors were checked against the four PDFs supplied for this upgrade. */
window.GSAT_EXPANSION={
 packs:`科學探究|recording observations accurately,repeating experiments carefully,checking our measurements,discussing unexpected results|準確記錄觀察,仔細重複實驗,檢查測量結果,討論意外的結果|draw more reliable conclusions,understand the evidence better,identify weaknesses in our methods,improve the quality of our research|得出更可靠的結論,更了解證據,找出方法的弱點,提升研究品質|ignoring inconvenient data,jumping to conclusions,hiding failed experiments,changing several variables at once|忽視不合心意的數據,草率下結論,隱瞞失敗的實驗,一次改變多個變因
數位安全|checking website addresses,updating security software,using strong passwords,learning to recognize scams|檢查網址,更新安全軟體,使用高強度密碼,學習辨認詐騙|reduce online risks,protect our personal data,use online services more safely,develop safer digital habits|降低網路風險,保護個人資料,更安全地使用網路服務,培養更安全的數位習慣|sharing passwords,opening suspicious attachments,ignoring security warnings,posting private details publicly|分享密碼,開啟可疑附件,忽視安全警告,公開發布私人細節
生涯探索|reflecting on our interests,interviewing experienced workers,trying different school projects,learning about unfamiliar careers|反思自己的興趣,訪問有經驗的工作者,嘗試不同的學校專題,了解陌生的職業|make informed career choices,discover our strengths,develop realistic expectations,prepare for future opportunities|做出有根據的生涯選擇,發現自己的長處,建立實際的期待,為未來的機會做準備|choosing a job only for money,following others blindly,ignoring our interests,expecting instant success|只為金錢選工作,盲目追隨他人,忽視自己的興趣,期待立即成功
公民參與|listening to community concerns,attending public meetings,checking policy details,discussing local issues respectfully|傾聽社區的關切,參加公開會議,查核政策細節,尊重地討論地方議題|understand public decisions,contribute to community discussions,make our voices heard,participate more responsibly|理解公共決策,為社區討論做出貢獻,讓自己的聲音被聽見,更負責任地參與|spreading unverified claims,attacking people personally,ignoring minority voices,refusing to consider evidence|散播未經查證的說法,進行人身攻擊,忽視少數人的聲音,拒絕考慮證據
食物永續|planning meals in advance,storing ingredients properly,using leftovers creatively,checking what is in the fridge|事先規劃餐點,妥善保存食材,創意運用剩食,檢查冰箱內的食物|reduce food waste,make better use of ingredients,save money on groceries,build more sustainable eating habits|減少食物浪費,更充分利用食材,節省購買食材的開銷,建立更永續的飲食習慣|buying more than we need,throwing away usable food,forgetting food in the fridge,serving excessively large portions|購買超出需要的食物,丟棄仍可食用的食物,忘記冰箱裡的食物,供應過大的份量
文化保存|recording local stories,learning traditional crafts,visiting community museums,supporting local cultural events|記錄地方故事,學習傳統工藝,參觀社區博物館,支持地方文化活動|understand our cultural heritage,connect with older generations,keep local traditions alive,appreciate the history of our community|了解文化資產,與年長世代建立聯繫,讓地方傳統延續,欣賞社區的歷史|dismissing old traditions,judging cultures by stereotypes,ignoring local knowledge,treating heritage only as a product|輕視古老傳統,以刻板印象評斷文化,忽視地方知識,只把文化資產當商品
團隊合作|sharing responsibilities fairly,clarifying common goals,giving constructive feedback,communicating progress regularly|公平分擔責任,釐清共同目標,提供建設性的回饋,定期溝通進度|complete group projects more effectively,build mutual trust,coordinate our efforts,learn from one another|更有效完成團體專題,建立相互信任,協調彼此的努力,互相學習|blaming others for every mistake,withholding useful information,avoiding difficult conversations,taking all the credit|把每個錯誤都歸咎於他人,隱瞞有用資訊,逃避困難的對話,把功勞全攬在自己身上
情緒調適|naming our feelings,taking time to reflect,seeking support when needed,practicing calming routines|說出自己的感受,花時間反思,需要時尋求支持,練習讓自己平靜的日常活動|respond to stress more calmly,understand our reactions,manage difficult emotions,develop emotional awareness|更冷靜地面對壓力,了解自己的反應,管理困難的情緒,培養情緒覺察|bottling up our feelings,denying every problem,taking frustration out on others,judging ourselves too harshly|壓抑感受,否認每個問題,把挫折發洩在他人身上,過度苛責自己
無障礙設計|listening to users with disabilities,testing designs with diverse users,checking accessibility guidelines,improving unclear instructions|傾聽身心障礙使用者,邀請不同使用者測試設計,檢查無障礙指引,改善不清楚的說明|create more inclusive services,remove barriers to participation,make products easier to use,understand different access needs|創造更包容的服務,消除參與障礙,讓產品更容易使用,了解不同的使用需求|assuming everyone has the same needs,ignoring user feedback,relying only on visual cues,treating accessibility as an afterthought|假定每個人的需求相同,忽視使用者回饋,只依賴視覺線索,到最後才考慮無障礙需求
防災準備|checking emergency supplies,learning evacuation routes,practicing safety drills,following reliable weather updates|檢查緊急物資,了解疏散路線,練習安全演練,關注可靠的天氣資訊|prepare for emergencies,respond more calmly to danger,make safer decisions during disasters,protect ourselves and others|為緊急事件做準備,更冷靜地回應危險,在災害期間做出更安全的決定,保護自己與他人|ignoring official warnings,spreading disaster rumors,waiting until the last minute,underestimating possible risks|忽視官方警告,散播災害謠言,等到最後一刻才行動,低估可能的風險`.split('\n').map(l=>l.split('|').map((s,i)=>i?s.split(','):s)),
 templates:[
 ['by … we stand a better chance of',3,'By {g}, we stand a better chance of being able to {b}, provided that we avoid {r}.','藉由{gz}，我們更有機會{bz}，前提是避免{rz}。'],
 ['instead of … it makes sense to',2,'Instead of {r}, it makes sense to focus on {g}, which can help us {b}.','與其{rz}，不如專注於{gz}，這能幫助我們{bz}。'],
 ['one practical way to',2,'One practical way to {b} is to make {g} a habit and stop {r}.','要{bz}，一個實際的方法是養成{gz}的習慣，並停止{rz}。'],
 ['the first step toward',3,'The first step toward being able to {b} is to commit to {g} rather than {r}.','要能夠{bz}，第一步是致力於{gz}，而非{rz}。'],
 ['without … it is harder to',2,'Without {g}, it is harder to {b}, especially if we keep {r}.','如果沒有{gz}，就更難{bz}，尤其當我們持續{rz}時。'],
 ['there is little point in',3,'There is little point in {r} when {g} offers us a better opportunity to {b}.','既然{gz}提供了更好的機會讓我們{bz}，{rz}就沒有什麼意義。'],
 ['it takes … to',2,'It takes a commitment to {g} to {b}; merely {r} will not get us there.','要{bz}，需要致力於{gz}；僅僅{rz}無法讓我們達成目標。'],
 ['whether … depends partly on',3,'Whether we can {b} depends partly on our commitment to {g} and our willingness to stop {r}.','我們能否{bz}，部分取決於我們對{gz}的投入，以及停止{rz}的意願。'],
 ['what matters most is',3,'What matters most is {g}, which helps us {b}, rather than {r}.','最重要的是能幫助我們{bz}的{gz}，而不是{rz}。'],
 ['a shift from … to',3,'A shift from {r} to {g} can put us in a better position to {b}.','從{rz}轉向{gz}，能讓我們更有條件{bz}。'],
 ['not … overnight',2,'We cannot expect to {b} overnight, but {g} is a better start than {r}.','我們不能期待一夜之間就{bz}，但{gz}是比{rz}更好的開始。'],
 ['as a result',2,'{G} can help us {b}; as a result, we have good reason to choose it over {r}.','{gz}能幫助我們{bz}；因此，我們有充分理由選擇這麼做，而非{rz}。']
 ],
 // year | question | pattern | English | Chinese | usage note
 curated:`111|1|have + object + past participle|We had the damaged bicycle repaired before lending it to our neighbor.|我們把損壞的自行車修好後，才借給鄰居。|have + 受詞 + 過去分詞表示請人完成某事；不是受詞主動去做。
111|2|assistant to|As assistant to the director, Leo checks every document before a meeting begins.|身為主管的助理，里歐會在會議開始前檢查每份文件。|assistant 是可數名詞；assistant to someone 表示某人的助理。
111|3|puppet show|The children made paper puppets and performed a short puppet show for their families.|孩子們製作紙偶，並為家人表演一場簡短的偶戲。|puppet 指由人操縱的戲偶；puppet show 為偶戲。
111|4|potentially harmful|Even a popular cleaning product can be potentially harmful if it is used incorrectly.|即使是受歡迎的清潔用品，使用不當也可能有害。|potentially 是副詞，修飾 harmful；表達可能性而非確定結果。
111|5|tag … with|Please tag each photograph with a location so that visitors can search the archive easily.|請替每張照片標註地點，讓訪客能輕鬆搜尋檔案。|tag A with B：用 B 標示 A；so that 後接完整子句。
111|6|agreeable|Our new teammate is agreeable, yet she speaks up whenever she notices an unfair decision.|新隊友很好相處，但每當她發現不公平的決定時，仍會表達意見。|agreeable 可指友善、好相處；不等於總是同意別人。
111|7|visible from|The lighthouse is clearly visible from the hill, even on a cloudy afternoon.|即使在陰天的午後，從山丘上仍能清楚看見燈塔。|visible from 表示從某處看得見；visible to 表示某人看得見。
111|8|eventual outcome|No one could predict the eventual outcome, so the team prepared several backup plans.|沒有人能預測最後的結果，因此團隊準備了幾個備案。|eventual 是形容詞，表示最終的；eventually 是副詞。
111|9|in a quest for|In a quest for cleaner energy, the students compared several ways to power their model car.|為了尋找更乾淨的能源，學生比較了幾種驅動模型車的方法。|a quest for + 名詞，表示對某物的追尋。
111|10|blush with|Nina blushed with embarrassment when she realized that she had called the teacher by the wrong name.|妮娜發現自己叫錯老師名字時，尷尬得臉紅了。|blush 可作不及物動詞；with embarrassment 說明臉紅的原因。
112|1|sticky|The label left a sticky mark on the jar, which took several minutes to wash off.|標籤在罐子上留下黏黏的痕跡，花了好幾分鐘才洗掉。|sticky 描述表面黏性；stick 的過去式與過去分詞是 stuck。
112|2|strike a pose|The actor struck a confident pose while the photographer adjusted the lights.|攝影師調整燈光時，演員擺出自信的姿勢。|strike a pose 為擺姿勢；strike 的過去式是 struck。
112|3|ancestors|By reading old letters, Irene learned how her ancestors built a new life in a distant town.|透過閱讀舊信件，艾琳得知祖先如何在遠方的小鎮建立新生活。|ancestor 是祖先；descendant 是後代，注意方向相反。
112|4|bare|After the books were packed, the bare shelves made the room look unusually empty.|書籍裝箱後，空蕩的書架讓房間顯得格外空曠。|bare 強調沒有覆蓋物或物品；blank 常指表面沒有文字或內容。
112|5|sincerity|The sincerity of his apology became clear when he offered to repair the damage himself.|當他主動提出親自修復損壞時，道歉的誠意便顯而易見。|sincerity 是名詞；sincere 是形容詞，sincerely 是副詞。
112|6|recall doing|I clearly recall meeting the author at a small bookshop when I was in junior high school.|我清楚記得國中時曾在一家小書店遇見那位作家。|recall 後可接動名詞，表示回想起曾做過的事。
112|7|counter an argument|To counter the argument, Maya presented data from three independent studies.|為了反駁該論點，瑪雅提出三項獨立研究的資料。|counter 作及物動詞可直接接受詞，不需加 against。
112|8|be crippled by|The coastal town was crippled by the storm, and many shops remained closed for weeks.|沿海小鎮遭風暴重創，許多商店持續關閉數週。|cripple 在此表示嚴重削弱運作能力；被動語態可接 by。
112|9|be choked with|The narrow river was choked with fallen branches after several days of heavy rain.|連日大雨後，狹窄的河道被掉落的樹枝堵塞。|be choked with 描述被大量事物阻塞的狀態。
112|10|supposedly|The supposedly quiet hotel turned out to be next to a busy construction site.|那間據說很安靜的旅館，結果就在繁忙的工地旁。|supposedly 表示據稱，常暗示說話者有所保留。
113|1|slender|A slender wooden bridge connects the two gardens without blocking the view of the river.|一座纖細的木橋連接兩座花園，且不會遮擋河景。|slender 可描述細長的物體；不只用來形容身材。
113|2|emerge from|A clear pattern emerged from the survey after the researchers organized the responses.|研究人員整理回覆後，調查中浮現出清楚的模式。|emerge from 表示從某處出現或由資料中浮現。
113|3|be due|The final report is due on Friday, so we need to finish collecting data today.|期末報告週五到期，因此我們今天必須完成資料蒐集。|be due 可表示預定時間或期限；on 接日期、星期。
113|4|humidity|High humidity can damage old books unless the library carefully controls the indoor environment.|除非圖書館仔細控制室內環境，否則高濕度可能損壞舊書。|humidity 是濕度；humid 是形容詞。
113|5|stand the test of time|A well-designed public park can stand the test of time and serve several generations.|設計良好的公園能經得起時間考驗，並服務好幾代人。|stand the test of time 表示經得起時間考驗。
113|6|compulsory|Safety training is compulsory for all volunteers before they enter the animal shelter.|所有志工進入動物收容所前，都必須接受安全訓練。|compulsory 表示強制的；optional 表示可選擇的。
113|7|give … credit for|The manager gave the interns credit for finding a simple solution to a difficult problem.|經理肯定實習生找到了困難問題的簡單解法。|give someone credit for + 名詞或動名詞，表示肯定其貢獻。
113|8|promise|The new train service promises a faster journey between the mountain town and the city.|新的鐵路服務可望縮短山城與都市之間的旅程。|promise 除了承諾，也能表示有望帶來某種結果。
113|9|make an appeal for|The shelter made an appeal for warm blankets as temperatures began to fall.|氣溫開始下降時，收容所呼籲民眾捐贈保暖毯子。|make an appeal for + 所需事物；appeal to someone for help。
113|10|randomly assigned|Participants were randomly assigned to two groups to reduce the influence of personal preferences.|參與者被隨機分配至兩組，以減少個人偏好的影響。|randomly 是副詞，修飾 assigned；assign A to B。
115|1|a tight schedule|Despite a tight schedule, the doctor set aside an hour to answer the students' questions.|儘管行程緊湊，醫師仍撥出一小時回答學生的問題。|tight schedule 表示行程緊湊；set aside time 表示撥出時間。
115|2|amateur|An amateur photographer captured the rare bird without disturbing its nest.|一位業餘攝影師在沒有打擾鳥巢的情況下拍到了這隻稀有鳥類。|amateur 可作名詞或形容詞，指非以該活動為職業者。
115|3|vacancy|The museum posted a vacancy for a guide who could explain local history in English.|博物館公告一個導覽員職缺，要求能以英文介紹地方歷史。|vacancy 可指職缺；a vacancy for + 職位。
115|4|initially|The plan initially seemed too expensive, but a local business later offered financial support.|計畫起初似乎太昂貴，但後來一家地方企業提供了資金支持。|initially 表示起初，常與 later 或 eventually 對照。
115|5|consumption of|The school reduced its consumption of electricity by replacing old lights with efficient ones.|學校以節能燈具汰換舊燈，降低了用電量。|consumption of + 資源，表示消耗或攝取；動詞為 consume。
115|6|dread doing|I used to dread asking questions in class until I discovered that others had the same doubts.|我以前害怕在課堂上發問，直到發現別人也有相同疑問。|dread 後可接動名詞；used to + 原形動詞表示過去習慣。
115|7|a passion for|Her passion for marine biology led her to volunteer at an aquarium during the summer.|她對海洋生物學的熱情，促使她暑假到水族館擔任志工。|a passion for + 名詞；lead someone to + 原形動詞。
115|8|assault|The witness reported the assault immediately and stayed nearby until help arrived.|目擊者立即通報攻擊事件，並留在附近直到援助到來。|assault 可作名詞或動詞，指攻擊；此處為名詞。
115|9|elbow one's way|We refused to elbow our way to the front and waited patiently for the crowd to move.|我們不願用手肘擠到前面，而是耐心等候人群移動。|elbow one's way 表示用手肘擠出一條路；way 前的人稱須配合主詞。
115|10|grave concerns|Residents expressed grave concerns about the safety of the old bridge after the flood.|洪水過後，居民對老橋的安全表達了嚴重憂慮。|grave 作形容詞可表示嚴重的；此處不是墳墓的意思。`.split('\n').map((s,i)=>{const [year,question,kind,en,zh,note]=s.split('|');return {id:'v6-exam-'+year+'-'+question,year,question,kind,en,zh,note,level:2,topic:'考點詞彙',origin:'curated',source:year+'學測第'+question+'題・考點延伸'};})
};
