import axios from 'axios'

/**
 * Emulating:  curl -v -F tpmdata=@test-data/TCGA-CHOL_logtpm_forTesting.tsv -F gmtdata=@test-data/Xena_manual_pathways.gmt http://localhost:8000/bpa_analysis
 * @param cohorts
 * @param gmtData
 * @returns {Promise<{msg: ({"TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A": string}|{"TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A": string}|{"TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A": string}|{"TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A": string}|{"TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A": string})[]}>}
 */
export async function doBpaAnalysisForCohorts(cohorts, gmtData){

  let formData = new FormData()
  formData.append('gmtdata',gmtData)
  formData.append('tpmdata',[])
  formData.append('input','text')
  const response = await axios.post('http://localhost:8000/bpa_analysis',
    formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
  console.log(response)

  return response

}

export const TEST_ANALYSIS_OUTPUT = {'msg':[{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Notch signaling (GO:0007219)\t4.37952977339081\t4.30533678597699\t4.23686648299816\t3.84759486531456\t4.11545988151269\t4.31704053206137\t4.17948244014584\t3.98062629287981\t3.86770025375887\t4.11270225897417'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Hippo signaling (GO:0035329)\t4.6218742065682\t4.54238092908033\t4.54011555551488\t4.78351004874219\t4.3426993270203\t4.52803052922891\t4.12661304330197\t4.78850507193221\t4.31206467890254\t4.39666136323095'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'DNA base excision repair (GO:0006281)\t3.60463940123854\t3.6101355036795\t3.61555823679977\t3.78718679940933\t3.66529538009796\t3.45541317520938\t4.05639592348409\t3.48242988537649\t4.30104869833826\t4.03413344992205'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'DNA strand break joining (GO:0006281)\t3.23137334696947\t3.22492693483418\t3.29291003773972\t3.21536247254702\t3.41089384637018\t3.40936066397473\t3.4188297575064\t3.27535578315555\t3.48302307616833\t3.67427754152238'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Poly(ADP-ribose) polymerase (PARP) (GO:0006281)\t2.40404681477439\t2.56525641465249\t2.40213462320685\t2.47143287426654\t2.53194644272191\t2.36725145381509\t2.38372850022152\t2.45985288822087\t2.76065612955056\t2.56230713349988'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Direct reversal of DNA damage (GO:0006281)\t2.12338564684558\t1.72694105789103\t1.88507674171698\t1.80705291644537\t1.71763495710348\t1.70457749680113\t2.420169921077\t1.87183813446216\t2.11242191156826\t2.03725288698711'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Repair of DNA-topoisomerase crosslinks (GO:0006281)\t1.69907783782562\t1.62077457659533\t1.63710111567653\t2.02389206370791\t1.67922265712511\t1.70326201466365\t1.70296962435885\t1.57597242802091\t1.93063747872222\t1.635184076074'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Mismatch excision repair (GO:0006281)\t2.87652120824505\t3.15374810244304\t2.97143165395518\t3.00798150043905\t3.15221500029958\t3.03334596735108\t2.78941120011535\t3.13992710348917\t3.0208925292238\t3.09674371378049'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Nucleotide excision repair (GO:0006281)\t6.46344250114304\t7.14784429310369\t6.48785973252413\t6.64335557807567\t6.77708018106603\t6.75218173967535\t7.00702814158778\t6.83245737280785\t7.10978992543819\t6.76154069169606'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Homologous recombination (GO:0006281)\t4.10191034359895\t4.71692055477908\t4.45976081122746\t4.99547645990472\t4.77457399004276\t4.58831705850013\t4.31820788386117\t4.51532847621562\t4.71608951359082\t5.15558555888524'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Fanconi anemia (GO:0006281)\t3.23895118789176\t3.62378131331687\t3.35483591449845\t3.8313588123667\t3.65512418399371\t3.40050333845974\t3.28437613110903\t3.62599343512728\t3.78144585615116\t3.87222333982699'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Non-homologous DNA end-joining (GO:0006281)\t3.81848702733435\t3.98735145326685\t3.78887004399784\t4.0357436032728\t4.0046845030655\t3.92207186747647\t3.70622849382341\t4.11257445324289\t3.63586242046262\t3.79496428625173'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Modulation of nucleotide pools (GO:0006281)\t2.01485716743802\t2.19729996694578\t1.9996345381921\t2.21904133540749\t2.24488179941146\t2.10436934666167\t2.37994153580881\t2.03493267552279\t2.4865580915373\t2.27085250755514'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'DNA polymerase (GO:0006281)\t3.99950448468648\t4.35147784712132\t4.1124701109042\t4.4572828215012\t4.44760030635153\t4.20693020536107\t4.17884103391891\t4.39246801041528\t4.74376659116014\t4.49590343438805'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Editing and processing nucleases (GO:0006281)\t1.79373822784024\t2.1168742036727\t1.89488236555434\t1.98134290342275\t2.00507253710908\t1.73003763864996\t2.0894932273037\t2.03454695075275\t2.03311659545738\t2.35770566984588'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Ubiquitination and modification (GO:0006281)\t4.09296569529915\t4.34606729520892\t4.19746287516519\t4.19505322653901\t4.32699038955324\t4.15702420810731\t3.93560896560896\t4.20787788219829\t4.19310467406881\t4.06777394687652'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Chromatin structure and modification (GO:0006281)\t1.82097836861249\t2.00909482235329\t1.92589887707893\t2.20890654253324\t1.96273496899754\t1.84141268939879\t2.14762855613323\t1.89055907825666\t2.08720411821052\t2.6025548266532'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Sensitivity to DNA damaging agents (GO:0006281)\t2.01999267375236\t2.08335326207591\t2.03300285579385\t2.36798739812778\t2.27918748210005\t1.9674918038955\t1.74172067113403\t2.13591236149424\t2.53970834376988\t2.37165168942057'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Known/suspected DNA repair function (GO:0006281)\t2.753691525215\t2.81057206729781\t2.70144187709538\t2.89093907887592\t2.99780379251547\t2.72015866897414\t2.32686305045719\t3.01551539464231\t2.83420866410577\t3.03048660032793'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Conserved DNA damage response (GO:0006281)\t4.43924322895153\t4.98696431291083\t4.55958514415315\t4.72162618872744\t4.90444536924356\t5.10432253449383\t4.53865482065685\t4.68069043745381\t5.02564834210471\t5.02290805631596'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'DNA damage checkpoint (GO:0000077)\t9.28297996210499\t9.25846831514899\t9.28144517786138\t9.18456138393945\t9.30677074242652\t9.57793659015365\t9.09691103370206\t9.13514741067645\t9.06075864475641\t9.98501955634407'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'PI3-K signaling (GO:0048017)\t6.20879260415891\t6.21365705789876\t5.70018274380064\t6.07048705506804\t6.29668230227898\t5.99274343738476\t5.72631936889741\t6.32117163019672\t6.61167385321446\t5.87229502931329'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Wnt signaling (GO:0016055)\t9.44188640509696\t8.77664197702243\t9.15070115960811\t8.27978395873843\t8.77294251981394\t8.36156901616033\t8.22188981781207\t8.37588748250277\t7.99308880395865\t8.67386254895975'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Intrinsic apoptotic pathway (GO:0097193)\t18.1520770316371\t18.107237997779\t18.3749223289125\t17.8683813804771\t17.9179995535445\t18.2487289478663\t18.2186153739573\t17.947435917048\t18.0878223227224\t17.1429036569816'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Extrinsic apoptotic pathway (GO:0097191)\t15.459104269766\t14.7497242162142\t15.5349151181583\t15.2042793689077\t15.7999970350298\t14.3611475712447\t14.3466175686143\t15.4513447383678\t13.8397496663628\t14.1163267318828'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Cell cycle (GO:0022402)\t11.8358370288534\t12.0890933055325\t11.6886743222078\t13.1100978663101\t12.5726174548556\t11.6535324753278\t11.1513080684438\t12.4947732160969\t12.4297319647176\t12.469291316247'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Histone modification (GO:0016570)\t20.4397507580411\t20.733866551425\t20.5016192481266\t20.4329654662667\t21.003417469489\t20.4268353833055\t20.1049175972393\t20.160416854186\t21.7823609426138\t20.7192634549313'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Oxidative stress (GO:0006979)\t13.5509674366565\t13.8090587022281\t13.9178715469807\t14.1666995559481\t13.6508957851446\t13.4448868262193\t12.9792884233357\t13.8592598947347\t12.8412724695815\t13.1088071477106'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'Ras signaling (GO:0007265)\t19.0276644577054\t18.5279752966231\t18.8482397231296\t18.6915720335062\t18.7815819192088\t18.4693413815963\t17.3491428909708\t18.6933673067612\t17.8522220247376\t17.2865315882804'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'TGF-B signaling (GO:0007179)\t14.2377911110976\t13.179036512976\t14.0704720488962\t12.8942496025625\t12.8257165708497\t12.6945852480804\t12.1212533848228\t13.5773158653983\t11.5586909780362\t12.0328287560144'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'TP53 signaling (GO:0072331)\t13.4560558277317\t13.3960686811745\t13.285131453483\t13.4530725529336\t13.5415726305773\t13.4555597248939\t13.695719962669\t13.3310536461495\t13.6775872119583\t13.3595891177103'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'cell cycle (Pancan Atlas)\t5.57028582117918\t5.37410888879136\t5.36636056025438\t5.79840582964841\t5.64477496315709\t5.19355343458082\t4.78917102625207\t5.31697253067857\t5.08628065364698\t4.886416637805'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'HIPPO (Pancan Atlas)\t8.43675593821648\t8.72465701999176\t8.35164307404056\t8.09753735784776\t8.75810029280638\t8.27237499558053\t7.79645312554937\t8.47716423318805\t6.96949728855041\t8.19216783802132'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'MYC (Pancan Atlas)\t4.52981340123766\t4.40310192932097\t4.57459134020779\t4.39266389255529\t4.83610419746918\t4.36577215184797\t4.65125341578546\t4.58539160821195\t4.84264550213325\t4.23518420086784'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'NOTCH (Pancan Atlas)\t11.481544066075\t10.6613372331483\t11.5006738406483\t10.3251329839732\t10.9201966898276\t10.6605831277479\t10.6348634540405\t10.6829660521864\t10.3688704499489\t10.6834160706998'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'NRF2 (Pancan Atlas)\t2.87630636843325\t3.12562527384453\t3.14345998531168\t2.99519106726576\t2.98987235471098\t2.73990783390206\t2.70070271102676\t3.07804739813593\t2.59300076400279\t2.65479040456363'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'PI3K (Pancan Atlas)\t8.07332511765736\t7.97866950115226\t7.81829015685084\t7.77909869322195\t8.02629833481352\t7.75488936713078\t7.84004177844221\t7.87975518123048\t8.16317666385185\t7.89903486212331'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'TGF-Beta (Pancan Atlas)\t4.57527136964164\t4.3252573225719\t4.28597338384852\t3.97216977731242\t4.31373470049877\t4.49114185479981\t3.80404601571163\t4.31598607842227\t3.82502641169216\t4.06761720693027'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'RTK RAS (Pancan Atlas)\t13.0778671830419\t13.1795522135895\t12.9060445063572\t12.4074312885222\t13.1778673123142\t12.7431749369313\t12.2781708297864\t12.9160537598128\t11.4274993767402\t12.1566648585753'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'TP53 (Pancan Atlas)\t3.3498163195298\t3.57642416867076\t3.43331375035766\t3.51331525665707\t3.83019456507169\t3.69312416972692\t3.22448085364775\t3.61533193581686\t4.07363204114573\t3.59655534839409'},{'TCGA.3X.AAV9.01A.TCGA.3X.AAVA.01A.TCGA.3X.AAVB.01A.TCGA.3X.AAVC.01A.TCGA.3X.AAVE.01A.TCGA.4G.AAZO.01A.TCGA.4G.AAZT.01A.TCGA.W5.AA2G.01A.TCGA.W5.AA2H.01A.TCGA.W5.AA2I.01A':'WNT (Pancan Atlas)\t9.11103703976429\t7.60901898690544\t8.80531542103793\t7.19091991102776\t7.83373475374714\t7.32633480470868\t7.3326206683993\t7.57143550979763\t7.10712085661661\t7.40955631976684'}]}



