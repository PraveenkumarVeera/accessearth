import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Satellite = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={76} height={76} {...props}>
    <Path
      d="M0 0 C0.73221771 -0.00671722 1.46443542 -0.01343445 2.21884155 -0.02035522 C4.63570979 -0.03932891 7.05230023 -0.04325908 9.46923828 -0.04541016 C11.1530875 -0.0518386 12.8369356 -0.05856699 14.52078247 -0.06558228 C18.04968861 -0.0775535 21.57849687 -0.08126327 25.10742188 -0.08007812 C29.62237505 -0.07987496 34.1366986 -0.10717496 38.65150261 -0.14162254 C42.12943385 -0.16389481 45.60721365 -0.16791557 49.08520889 -0.16685867 C50.74934178 -0.16921422 52.41347887 -0.17803521 54.07754135 -0.19352341 C56.40890945 -0.21319057 58.73892107 -0.20734364 61.0703125 -0.1953125 C62.09451294 -0.21217102 62.09451294 -0.21217102 63.1394043 -0.22937012 C68.10517217 -0.16447696 70.89559767 1.1065011 74.66455078 4.29052734 C78.46304209 8.800886 79.17288937 11.98385316 79.21386719 17.82128906 C79.22408905 18.55058624 79.23431091 19.27988342 79.24484253 20.03128052 C79.27250759 22.42793146 79.27073128 24.82342379 79.26611328 27.22021484 C79.27389483 28.89641746 79.28256575 30.57261616 79.29208374 32.24880981 C79.30698109 35.75747474 79.30644629 39.2657371 79.29589844 42.77441406 C79.28431741 47.25586599 79.31815815 51.73566239 79.36458778 56.21684074 C79.39415205 59.67776004 79.39579397 63.1382848 79.38956833 66.59930801 C79.39059049 68.25063478 79.40098594 69.90198487 79.42119217 71.55318832 C79.58784768 87.07709883 79.58784768 87.07709883 74.34213257 92.94973755 C70.1622679 96.29045091 66.57049431 96.58797128 61.32910156 96.58105469 C60.23077499 96.59113052 60.23077499 96.59113052 59.11026001 96.60140991 C56.69339177 96.6203836 54.27680133 96.62431377 51.85986328 96.62646484 C50.17601406 96.63289328 48.49216597 96.63962168 46.80831909 96.64663696 C43.27941295 96.65860819 39.7506047 96.66231796 36.22167969 96.66113281 C31.70672652 96.66092965 27.19240296 96.68822964 22.67759895 96.72267723 C19.19966772 96.7449495 15.72188792 96.74897026 12.24389267 96.74791336 C10.57975978 96.75026891 8.91562269 96.75908989 7.25156021 96.77457809 C4.92019212 96.79424526 2.59018049 96.78839832 0.25878906 96.77636719 C-0.42401123 96.7876062 -1.10681152 96.79884521 -1.81030273 96.8104248 C-6.77607061 96.74553165 -9.56649611 95.47455359 -13.33544922 92.29052734 C-17.13394053 87.78016869 -17.84378781 84.59720153 -17.88476562 78.75976562 C-17.89498749 78.03046844 -17.90520935 77.30117126 -17.91574097 76.54977417 C-17.94340602 74.15312323 -17.94162971 71.7576309 -17.93701172 69.36083984 C-17.94479327 67.68463723 -17.95346418 66.00843853 -17.96298218 64.33224487 C-17.97787953 60.82357995 -17.97734473 57.31531759 -17.96679688 53.80664062 C-17.95521585 49.3251887 -17.98905658 44.84539229 -18.03548622 40.36421394 C-18.06505049 36.90329465 -18.0666924 33.44276989 -18.06046677 29.98174667 C-18.06148893 28.33041991 -18.07188438 26.67906982 -18.09209061 25.02786636 C-18.25874612 9.50395586 -18.25874612 9.50395586 -13.01303101 3.63131714 C-8.83316633 0.29060377 -5.24139275 -0.00691659 0 0 Z "
      fill="#A49D98"
      transform="translate(17.33544921875,-0.29052734375)"
    />
    <Path
      d="M0 0 C3.63894928 1.36849725 6.9324108 3.00460642 10.296875 4.94921875 C11.83915771 5.83879272 11.83915771 5.83879272 13.41259766 6.74633789 C15.06461182 7.70721313 15.06461182 7.70721313 16.75 8.6875 C17.91321809 9.36129959 19.07646732 10.03504543 20.23974609 10.70874023 C29.11372981 15.85851469 37.91904172 21.11974078 46.70385742 26.42016602 C55.09906252 31.48017118 63.55219416 36.43546593 72.03564453 41.34594727 C77.42178863 44.46923746 82.74067921 47.66723842 88 51 C85.57857561 53.42142439 84.30040872 53.24876761 80.99475098 53.29327393 C80.30071167 53.29236755 79.60667236 53.29146118 78.89160156 53.29052734 C78.1596759 53.29724457 77.42775024 53.30396179 76.67364502 53.31088257 C74.24590318 53.32993065 71.81843699 53.33379067 69.390625 53.3359375 C67.70391729 53.34236261 66.01721071 53.34909075 64.33050537 53.35610962 C60.78964659 53.36810075 57.24888548 53.37178876 53.70800781 53.37060547 C49.17730318 53.37040261 44.64722815 53.39766209 40.11667252 53.43214989 C36.63015894 53.45442724 33.14379639 53.4584427 29.65721893 53.45738602 C27.98750395 53.45974236 26.31778482 53.46856784 24.64813995 53.48405075 C22.30697638 53.50372072 19.96716344 53.497869 17.62597656 53.48583984 C16.94003418 53.49707886 16.2540918 53.50831787 15.54736328 53.51989746 C10.59567857 53.45547839 7.83097198 52.06118742 4 49 C-0.57630566 43.88849282 -0.53859998 39.52744572 -0.390625 33.0078125 C-0.38496521 32.06187225 -0.37930542 31.11593201 -0.37347412 30.1413269 C-0.35117571 27.13535858 -0.30099138 24.13060489 -0.25 21.125 C-0.22992656 19.08074644 -0.21167727 17.03647411 -0.1953125 14.9921875 C-0.15133228 9.99432735 -0.08234985 4.99736925 0 0 Z "
      fill="#7A797A"
      transform="translate(0,43)"
    />
    <Path
      d="M0 0 C8.13999546 3.92473674 15.92140885 8.21909742 23.625 12.9375 C32.56427928 18.35955263 41.55659726 23.67173148 50.625 28.875 C58.77776623 33.55589322 66.91378119 38.25173259 74.9296875 43.1640625 C76.90085262 44.34274902 78.9053502 45.46828459 80.9453125 46.5234375 C87.61731684 50.0442328 90.47716259 53.88911874 93 61 C93.89002864 63.94437146 94 65.79790973 94 69 C92 71.75 92 71.75 90 74 C86.13990668 73.41640244 83.38333805 72.28579206 80.03515625 70.296875 C79.08229736 69.73572998 78.12943848 69.17458496 77.14770508 68.59643555 C76.1295874 67.98711182 75.11146973 67.37778809 74.0625 66.75 C72.99346436 66.11811768 71.92442871 65.48623535 70.82299805 64.83520508 C67.54498359 62.89627175 64.27243481 60.94833114 61 59 C58.30932754 57.40797198 55.61701935 55.81874074 52.92456055 54.22973633 C51.17280994 53.19545195 49.42167721 52.16012039 47.67114258 51.1237793 C37.89766527 45.33801359 28.09849301 39.59569294 18.28929138 33.87071228 C16.58239995 32.86851465 14.88458453 31.85091007 13.18701172 30.83300781 C10.0687744 28.97777168 10.0687744 28.97777168 6.94189453 27.58105469 C4.21314479 26.25454562 2.14041177 25.15298523 0 23 C-1.18670332 18.97009071 -0.95761942 15.28018411 -0.625 11.125 C-0.57988281 10.05507813 -0.53476563 8.98515625 -0.48828125 7.8828125 C-0.37071947 5.24942873 -0.20682479 2.6276294 0 0 Z "
      fill="#8C8683"
      transform="translate(0,20)"
    />
    <Path
      d="M0 0 C5.30186559 -0.09918586 10.60318618 -0.17161755 15.90576172 -0.21972656 C17.70794081 -0.23979033 19.51005521 -0.26704813 21.31201172 -0.30175781 C23.90869136 -0.35050829 26.50450729 -0.37302082 29.1015625 -0.390625 C30.30191635 -0.42159271 30.30191635 -0.42159271 31.52651978 -0.45318604 C36.82385322 -0.45529096 39.867229 0.39384455 44 4 C48.5176266 9.07224175 48.54082259 13.3150144 48.390625 19.7734375 C48.38496521 20.6971817 48.37930542 21.6209259 48.37347412 22.57266235 C48.35118052 25.50731418 48.30099748 28.44072061 48.25 31.375 C48.22992592 33.37107605 48.21167674 35.36717134 48.1953125 37.36328125 C48.15133872 42.24266338 48.08235999 47.12112093 48 52 C44.726748 48.78008889 41.91574982 45.65846503 39.3125 41.875 C35.65697421 36.75036668 31.64485325 32.14383654 27.35546875 27.54296875 C25.41553894 25.44861666 23.57507239 23.31784516 21.75 21.125 C16.85305629 15.46474372 11.1630012 10.54267683 5.62817383 5.52050781 C3.70566786 3.72513112 1.85171383 1.86804288 0 0 Z "
      fill="#837F7D"
      transform="translate(48,0)"
    />
    <Path
      d="M0 0 C15.40909775 -1.52565324 15.40909775 -1.52565324 21.36328125 1.98046875 C24.08935053 4.52917001 26.55013242 7.1870345 29 10 C30.24988056 11.08707047 31.51953607 12.15204461 32.8125 13.1875 C43.49898322 22.51348638 52.67555419 33.56319431 61 45 C61.45383057 45.49830322 61.90766113 45.99660645 62.37524414 46.51000977 C66.97208194 51.89260405 66.58794093 57.11080239 66.3125 63.9375 C66.28994141 65.00291016 66.26738281 66.06832031 66.24414062 67.16601562 C66.18555756 69.77882022 66.10358677 72.38865733 66 75 C63.24830466 71.70864027 61.04507074 68.45277348 59 64.6875 C52.64141125 53.62137238 44.68748863 43.47503237 35.99609375 34.1484375 C34.17614754 32.18959128 32.46282627 30.17704125 30.75 28.125 C22.93108231 19.19166186 13.73981363 11.56180601 4.31811523 4.3894043 C2.86364205 3.27911151 1.42947664 2.14229542 0 1 C0 0.67 0 0.34 0 0 Z "
      fill="#6E6A73"
      transform="translate(30,0)"
    />
    <Path
      d="M0 0 C3.80066473 2.19630844 6.80599788 5.01189223 10 8 C11.48733755 9.16222246 12.9870844 10.30877487 14.5 11.4375 C29.18263018 22.86017557 41.88202313 36.13889665 53 51 C52.01 51.495 52.01 51.495 51 52 C48.51892972 50.63862358 46.18189353 49.22507042 43.8125 47.6875 C43.09199463 47.22819092 42.37148926 46.76888184 41.62915039 46.2956543 C36.42383972 42.96236408 31.26976908 39.55226636 26.13989258 36.10424805 C20.29692173 32.17905518 14.39986606 28.33898016 8.5 24.5 C6.5298744 23.21365426 4.55982111 21.92719775 2.58984375 20.640625 C-0.86623863 18.38489041 -4.3312524 16.14467204 -7.80859375 13.921875 C-9.18503184 13.03146021 -10.56134435 12.14085125 -11.9375 11.25 C-12.56398438 10.85619141 -13.19046875 10.46238281 -13.8359375 10.05664062 C-15.52734375 8.953125 -15.52734375 8.953125 -18 7 C-18 6.01 -18 5.02 -18 4 C-12.89999473 -0.95833846 -6.82654539 -1.42399493 0 0 Z "
      fill="#57655B"
      transform="translate(22,0)"
    />
    <Path
      d="M0 0 C6.14412478 1.36659557 11.43358124 2.68920771 16.3671875 6.71875 C18.04671696 8.0956586 18.04671696 8.0956586 20.26953125 9.33203125 C23.64503316 11.39403313 26.70822688 13.74198986 29.8125 16.1875 C30.42689941 16.6707373 31.04129883 17.15397461 31.67431641 17.65185547 C36.42657613 21.43988858 41.02420007 25.38214542 45 30 C45 30.33 45 30.66 45 31 C40.12538525 31.09924823 35.25136503 31.17164581 30.37597656 31.21972656 C28.71929675 31.23978009 27.06268718 31.26703029 25.40625 31.30175781 C23.01805242 31.35055512 20.63079453 31.37303064 18.2421875 31.390625 C17.14026566 31.42159271 17.14026566 31.42159271 16.01608276 31.45318604 C10.83832192 31.45541991 7.99320027 30.24063275 4 27 C-0.82369381 21.74504879 -0.48770532 16.872174 -0.25 10.125 C-0.23195313 9.15046875 -0.21390625 8.1759375 -0.1953125 7.171875 C-0.14841734 4.78022193 -0.08280907 2.39063403 0 0 Z "
      fill="#556259"
      transform="translate(0,65)"
    />
    <Path
      d="M0 0 C6.8544077 3.50558065 13.3129153 7.45185629 19.68041992 11.76538086 C25.3469215 15.59379477 31.09847694 19.27757693 36.875 22.9375 C44.36597106 27.68606835 51.83995088 32.45777607 59.27392578 37.29516602 C63.23669971 39.87150027 67.23110716 42.3866043 71.25 44.875 C76.99994067 48.53960558 80.56043943 51.47282015 83 58 C75.62783705 54.02756913 68.34764716 49.92511656 61.125 45.6875 C60.10978271 45.09356445 59.09456543 44.49962891 58.04858398 43.88769531 C55.28451168 42.27004804 52.52132749 40.65089758 49.75860596 39.03094482 C47.32996603 37.60720703 44.90063517 36.18465011 42.47134399 34.76202393 C35.72950696 30.8137851 28.98982981 26.861876 22.25146484 22.90771484 C19.33089618 21.19414497 16.40967345 19.48169653 13.48828125 17.76953125 C11.95047376 16.86726772 10.412709 15.96493137 8.875 15.0625 C8.20090088 14.66772461 7.52680176 14.27294922 6.83227539 13.86621094 C4.17248067 12.30357713 1.56780634 10.71187089 -1 9 C-1.4375 2.875 -1.4375 2.875 0 0 Z "
      fill="#756F75"
      transform="translate(1,8)"
    />
    <Path
      d="M0 0 C7.12606863 -0.58109573 7.12606863 -0.58109573 10.984375 1.984375 C12.35335937 3.35335938 12.35335937 3.35335938 13.75 4.75 C14.25313721 5.24371094 14.75627441 5.73742187 15.2746582 6.24609375 C16.33243582 7.28893147 17.38159242 8.34057931 18.42236328 9.40039062 C19.96530609 10.96482289 21.53664157 12.49335697 23.12109375 14.015625 C28.79776617 19.51065829 34.06249839 25.18977897 38.953125 31.41015625 C40.29079111 33.10266127 41.67548674 34.75929713 43.109375 36.37109375 C46.47978313 40.26054474 48.42106296 42.79442931 48.4375 48.0625 C48.293125 49.361875 48.14875 50.66125 48 52 C44.5907338 48.91035251 41.96656853 45.63807079 39.3125 41.875 C35.65697421 36.75036668 31.64485325 32.14383654 27.35546875 27.54296875 C25.41553894 25.44861666 23.57507239 23.31784516 21.75 21.125 C17.31131606 15.99443486 12.20856104 11.52196302 7.20703125 6.953125 C4.73879897 4.69686609 2.33902863 2.391265 0 0 Z "
      fill="#A9A199"
      transform="translate(48,0)"
    />
    <Path
      d="M0 0 C3.63894928 1.36849725 6.9324108 3.00460642 10.296875 4.94921875 C11.83915771 5.83879272 11.83915771 5.83879272 13.41259766 6.74633789 C15.06461182 7.70721313 15.06461182 7.70721313 16.75 8.6875 C17.91321809 9.36129959 19.07646732 10.03504543 20.23974609 10.70874023 C29.11514916 15.85933837 37.92146281 21.12204183 46.70825195 26.42236328 C55.04643874 31.44705297 63.43946878 36.37253953 71.85986328 41.25805664 C73.6839263 42.31680418 75.50658312 43.37797911 77.32763672 44.44189453 C79.18380491 45.52412232 81.04521434 46.59739058 82.91064453 47.66357422 C83.8282959 48.19611816 84.74594727 48.72866211 85.69140625 49.27734375 C86.93386108 49.99071899 86.93386108 49.99071899 88.20141602 50.71850586 C88.79494873 51.14139893 89.38848145 51.56429199 90 52 C90 52.66 90 53.32 90 54 C86.13990668 53.41640244 83.38333805 52.28579206 80.03515625 50.296875 C79.08229736 49.73572998 78.12943848 49.17458496 77.14770508 48.59643555 C76.1295874 47.98711182 75.11146973 47.37778809 74.0625 46.75 C72.99346436 46.11811768 71.92442871 45.48623535 70.82299805 44.83520508 C67.54498359 42.89627175 64.27243481 40.94833114 61 39 C58.30932754 37.40797198 55.61701935 35.81874074 52.92456055 34.22973633 C51.17280994 33.19545195 49.42167721 32.16012039 47.67114258 31.1237793 C37.8972425 25.33776332 28.093766 19.60228541 18.28913879 13.86854553 C16.58739699 12.87140034 14.8883894 11.86959355 13.18945312 10.86767578 C11.11009398 9.65004738 9.02056536 8.44957264 6.91992188 7.26904297 C6.00275391 6.74584473 5.08558594 6.22264648 4.140625 5.68359375 C3.33657227 5.2342749 2.53251953 4.78495605 1.70410156 4.32202148 C1.14174805 3.88575439 0.57939453 3.4494873 0 3 C0 2.01 0 1.02 0 0 Z "
      fill="#A19B9B"
      transform="translate(0,40)"
    />
    <Path
      d="M0 0 C7.03280386 -0.90381415 10.75212896 1.94994221 16.3125 6 C17.15047119 6.59216309 17.98844238 7.18432617 18.85180664 7.79443359 C24.0625108 11.50559996 29.16941698 15.32412518 34.08984375 19.4140625 C36.00792105 21.05458265 36.00792105 21.05458265 38.23828125 22.54296875 C39.11033203 23.26419922 39.11033203 23.26419922 40 24 C40.25 26.6875 40.25 26.6875 40 29 C34.32942343 25.91176323 29.15002281 22.36646785 23.9375 18.5625 C22.77250977 17.72235352 22.77250977 17.72235352 21.58398438 16.86523438 C18.19712103 14.40753591 14.86457337 11.93397684 11.67578125 9.22265625 C9.54582233 7.4533911 7.69337733 6.11910497 5.25 4.875 C2 3 2 3 0 0 Z "
      fill="#645F64"
      transform="translate(56,0)"
    />
    <Path
      d="M0 0 C17.92111999 4.16309203 35.86907929 17.52219652 47 32 C44 32 44 32 42.1953125 30.3828125 C41.17050781 29.26519531 41.17050781 29.26519531 40.125 28.125 C30.22393659 17.90195078 18.29018891 9.21183879 5 4 C4.030625 3.608125 3.06125 3.21625 2.0625 2.8125 C1.381875 2.544375 0.70125 2.27625 0 2 C0 1.34 0 0.68 0 0 Z "
      fill="#9C9797"
      transform="translate(0,63)"
    />
    <Path
      d="M0 0 C4.88036541 1.67491831 8.99152948 4.36791961 13.3125 7.125 C14.05306641 7.59292969 14.79363281 8.06085937 15.55664062 8.54296875 C17.37341968 9.69164196 19.18703037 10.84532369 21 12 C20.67 13.32 20.34 14.64 20 16 C14.5 11.875 14.5 11.875 12.85449219 10.63867188 C10.38389352 8.78316608 7.9099235 6.93367094 5.421875 5.1015625 C4.70515625 4.57304687 3.9884375 4.04453125 3.25 3.5 C2.61578125 3.0359375 1.9815625 2.571875 1.328125 2.09375 C0.88984375 1.7328125 0.4515625 1.371875 0 1 C0 0.67 0 0.34 0 0 Z "
      fill="#797878"
      transform="translate(75,8)"
    />
    <Path
      d="M0 0 C0.66 0 1.32 0 2 0 C3.01268859 3.79758221 3.01268859 6.20241779 2 10 C0.4375 8.375 0.4375 8.375 -1 6 C-0.6875 2.75 -0.6875 2.75 0 0 Z "
      fill="#454D46"
      transform="translate(2,66)"
    />
    <Path
      d="M0 0 C1.98 0 3.96 0 6 0 C5.34 1.98 4.68 3.96 4 6 C3.01 6 2.02 6 1 6 C1 4.68 1 3.36 1 2 C0.67 1.34 0.34 0.68 0 0 Z "
      fill="#454D46"
      transform="translate(15,75)"
    />
  </Svg>
);
export default Satellite;
