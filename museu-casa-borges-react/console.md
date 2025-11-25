13:27:47.684 Running build in Washington, D.C., USA (East) – iad1
13:27:47.684 Build machine configuration: 2 cores, 8 GB
13:27:47.932 Cloning github.com/YellowDark25/museu_final (Branch: main, Commit: 2aab65e)
13:27:47.933 Previous build caches not available.
13:28:04.744 Cloning completed: 16.812s
13:28:05.262 Running "vercel build"
13:28:05.684 Vercel CLI 48.10.5
13:28:05.924 WARN! Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings
13:28:06.162 Installing dependencies...
13:28:12.144 npm warn deprecated @types/react-pdf@7.0.0: This is a stub types definition. react-pdf provides its own type definitions, so you do not need this installed.
13:28:27.871 
13:28:27.871 added 407 packages in 21s
13:28:27.872 
13:28:27.872 146 packages are looking for funding
13:28:27.872   run `npm fund` for details
13:28:28.063 Detected Next.js version: 15.5.4
13:28:28.069 Running "npm run build"
13:28:28.207 
13:28:28.208 > museu-casa-borges-react@0.1.0 build
13:28:28.208 > next build --turbopack
13:28:28.208 
13:28:29.239 Attention: Next.js now collects completely anonymous telemetry regarding usage.
13:28:29.240 This information is used to shape Next.js' roadmap and prioritize features.
13:28:29.240 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
13:28:29.240 https://nextjs.org/telemetry
13:28:29.240 
13:28:29.296    ▲ Next.js 15.5.4 (Turbopack)
13:28:29.297    - Experiments (use with caution):
13:28:29.297      · optimizePackageImports
13:28:29.298 
13:28:29.338    Creating an optimized production build ...
13:29:01.340  ✓ Finished writing to disk in 43ms
13:29:01.510 
13:29:01.511 > Build error occurred
13:29:01.516 Error: Turbopack build failed with 30 errors:
13:29:01.517 ./museu-casa-borges-react/src/app/artistas/gabriel-garcia-marquez/page.tsx:124:8
13:29:01.517 Parsing ecmascript source code failed
13:29:01.517 [0m [90m 122 |[39m
13:29:01.517  [90m 123 |[39m   [36mreturn[39m (
13:29:01.517 [31m[1m>[22m[39m[90m 124 |[39m     [33m&[39mlt[33m;[39m[33mLayout[39m[33m&[39mgt[33m;[39m
13:29:01.517  [90m     |[39m        [31m[1m^[22m[39m
13:29:01.517  [90m 125 |[39m       [33m&[39mlt[33m;[39m[33mContentPage[39m
13:29:01.517  [90m 126 |[39m         title[33m=[39m[32m"Gabriel García Márquez"[39m
13:29:01.517  [90m 127 |[39m         subtitle[33m=[39m[32m"Mestre do Realismo Mágico"[39m[0m
13:29:01.517 
13:29:01.517 Expected ',', got ';'
13:29:01.518 
13:29:01.518 
13:29:01.518 ./museu-casa-borges-react/src/app/artistas/gabriel-garcia-marquez/page.tsx:124:8
13:29:01.518 Parsing ecmascript source code failed
13:29:01.518 [0m [90m 122 |[39m
13:29:01.518  [90m 123 |[39m   [36mreturn[39m (
13:29:01.518 [31m[1m>[22m[39m[90m 124 |[39m     [33m&[39mlt[33m;[39m[33mLayout[39m[33m&[39mgt[33m;[39m
13:29:01.518  [90m     |[39m        [31m[1m^[22m[39m
13:29:01.518  [90m 125 |[39m       [33m&[39mlt[33m;[39m[33mContentPage[39m
13:29:01.518  [90m 126 |[39m         title[33m=[39m[32m"Gabriel García Márquez"[39m
13:29:01.518  [90m 127 |[39m         subtitle[33m=[39m[32m"Mestre do Realismo Mágico"[39m[0m
13:29:01.518 
13:29:01.518 Expected ',', got ';'
13:29:01.518 
13:29:01.518 
13:29:01.518 ./museu-casa-borges-react/src/app/artistas/julio-cortazar/page.tsx:82:8
13:29:01.518 Parsing ecmascript source code failed
13:29:01.518 [0m [90m 80 |[39m
13:29:01.519  [90m 81 |[39m   [36mreturn[39m (
13:29:01.519 [31m[1m>[22m[39m[90m 82 |[39m     [33m&[39mlt[33m;[39m[33mLayout[39m[33m&[39mgt[33m;[39m
13:29:01.519  [90m    |[39m        [31m[1m^[22m[39m
13:29:01.519  [90m 83 |[39m       [33m&[39mlt[33m;[39m[33mContentPage[39m
13:29:01.519  [90m 84 |[39m         title[33m=[39m[32m"Julio Cortázar"[39m
13:29:01.519  [90m 85 |[39m         subtitle[33m=[39m[32m"Mestre do Realismo Fantástico"[39m[0m
13:29:01.519 
13:29:01.519 Expected ',', got ';'
13:29:01.519 
13:29:01.519 
13:29:01.519 ./museu-casa-borges-react/src/app/artistas/julio-cortazar/page.tsx:82:8
13:29:01.519 Parsing ecmascript source code failed
13:29:01.519 [0m [90m 80 |[39m
13:29:01.519  [90m 81 |[39m   [36mreturn[39m (
13:29:01.519 [31m[1m>[22m[39m[90m 82 |[39m     [33m&[39mlt[33m;[39m[33mLayout[39m[33m&[39mgt[33m;[39m
13:29:01.519  [90m    |[39m        [31m[1m^[22m[39m
13:29:01.519  [90m 83 |[39m       [33m&[39mlt[33m;[39m[33mContentPage[39m
13:29:01.519  [90m 84 |[39m         title[33m=[39m[32m"Julio Cortázar"[39m
13:29:01.519  [90m 85 |[39m         subtitle[33m=[39m[32m"Mestre do Realismo Fantástico"[39m[0m
13:29:01.526 
13:29:01.526 Expected ',', got ';'
13:29:01.526 
13:29:01.526 
13:29:01.526 ./museu-casa-borges-react/src/app/artistas/octavio-paz/page.tsx:105:8
13:29:01.526 Parsing ecmascript source code failed
13:29:01.526 [0m [90m 103 |[39m
13:29:01.526  [90m 104 |[39m   [36mreturn[39m (
13:29:01.526 [31m[1m>[22m[39m[90m 105 |[39m     [33m&[39mlt[33m;[39m[33mLayout[39m[33m&[39mgt[33m;[39m
13:29:01.526  [90m     |[39m        [31m[1m^[22m[39m
13:29:01.526  [90m 106 |[39m       [33m&[39mlt[33m;[39m[33mContentPage[39m
13:29:01.527  [90m 107 |[39m         title[33m=[39m[32m"Octavio Paz"[39m
13:29:01.527  [90m 108 |[39m         subtitle[33m=[39m[32m"Poeta da Solidão e do Tempo"[39m[0m
13:29:01.527 
13:29:01.527 Expected ',', got ';'
13:29:01.527 
13:29:01.527 
13:29:01.527 ./museu-casa-borges-react/src/app/artistas/octavio-paz/page.tsx:105:8
13:29:01.527 Parsing ecmascript source code failed
13:29:01.527 [0m [90m 103 |[39m
13:29:01.527  [90m 104 |[39m   [36mreturn[39m (
13:29:01.527 [31m[1m>[22m[39m[90m 105 |[39m     [33m&[39mlt[33m;[39m[33mLayout[39m[33m&[39mgt[33m;[39m
13:29:01.527  [90m     |[39m        [31m[1m^[22m[39m
13:29:01.527  [90m 106 |[39m       [33m&[39mlt[33m;[39m[33mContentPage[39m
13:29:01.527  [90m 107 |[39m         title[33m=[39m[32m"Octavio Paz"[39m
13:29:01.527  [90m 108 |[39m         subtitle[33m=[39m[32m"Poeta da Solidão e do Tempo"[39m[0m
13:29:01.527 
13:29:01.527 Expected ',', got ';'
13:29:01.527 
13:29:01.527 
13:29:01.529 ./museu-casa-borges-react/src/app/artistas/page.tsx:97:39
13:29:01.529 Parsing ecmascript source code failed
13:29:01.530 [0m [90m  95 |[39m   ]
13:29:01.530  [90m  96 |[39m
13:29:01.530 [31m[1m>[22m[39m[90m  97 |[39m   [36mconst[39m getCorClasses [33m=[39m (cor[33m:[39m string) [33m=[39m[33m&[39mgt[33m;[39m {
13:29:01.530  [90m     |[39m                                       [31m[1m^[22m[39m
13:29:01.530  [90m  98 |[39m     [36mconst[39m cores [33m=[39m {
13:29:01.530  [90m  99 |[39m       blue[33m:[39m [32m"border-blue-200 hover:border-blue-300 hover:shadow-blue-100"[39m[33m,[39m
13:29:01.530  [90m 100 |[39m       purple[33m:[39m [32m"border-purple-200 hover:border-purple-300 hover:shadow-purple-100"[39m[33m,[39m[0m
13:29:01.530 
13:29:01.530 Expected '=>', got '='
13:29:01.530 
13:29:01.530 
13:29:01.530 ./museu-casa-borges-react/src/app/artistas/page.tsx:97:39
13:29:01.530 Parsing ecmascript source code failed
13:29:01.530 [0m [90m  95 |[39m   ]
13:29:01.530  [90m  96 |[39m
13:29:01.530 [31m[1m>[22m[39m[90m  97 |[39m   [36mconst[39m getCorClasses [33m=[39m (cor[33m:[39m string) [33m=[39m[33m&[39mgt[33m;[39m {
13:29:01.530  [90m     |[39m                                       [31m[1m^[22m[39m
13:29:01.531  [90m  98 |[39m     [36mconst[39m cores [33m=[39m {
13:29:01.531  [90m  99 |[39m       blue[33m:[39m [32m"border-blue-200 hover:border-blue-300 hover:shadow-blue-100"[39m[33m,[39m
13:29:01.531  [90m 100 |[39m       purple[33m:[39m [32m"border-purple-200 hover:border-purple-300 hover:shadow-purple-100"[39m[33m,[39m[0m
13:29:01.531 
13:29:01.531 Expected '=>', got '='
13:29:01.531 
13:29:01.531 
13:29:01.531 ./museu-casa-borges-react/src/app/galerias/dia-meio-ambiente/page.tsx:82:18
13:29:01.531 Parsing ecmascript source code failed
13:29:01.531 [0m [90m 80 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mDioMeioAmbientePage[39m() {
13:29:01.534  [90m 81 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Header da galeria */[39m}
13:29:01.534 [31m[1m>[22m[39m[90m 82 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"py-8 border-b"[39m[33m>[39m
13:29:01.534  [90m    |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.534  [90m 83 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"container mx-auto px-4"[39m[33m>[39m
13:29:01.534  [90m 84 |[39m             [33m<[39m[33mmotion[39m[33m.[39mdiv
13:29:01.534  [90m 85 |[39m               initial[33m=[39m{{ opacity[33m:[39m [35m0[39m[33m,[39m y[33m:[39m [35m20[39m }}[0m
13:29:01.534 
13:29:01.534 Expected ',', got 'className'
13:29:01.534 
13:29:01.534 
13:29:01.534 ./museu-casa-borges-react/src/app/galerias/dia-meio-ambiente/page.tsx:82:18
13:29:01.534 Parsing ecmascript source code failed
13:29:01.535 [0m [90m 80 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mDioMeioAmbientePage[39m() {
13:29:01.535  [90m 81 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Header da galeria */[39m}
13:29:01.535 [31m[1m>[22m[39m[90m 82 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"py-8 border-b"[39m[33m>[39m
13:29:01.535  [90m    |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.535  [90m 83 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"container mx-auto px-4"[39m[33m>[39m
13:29:01.535  [90m 84 |[39m             [33m<[39m[33mmotion[39m[33m.[39mdiv
13:29:01.535  [90m 85 |[39m               initial[33m=[39m{{ opacity[33m:[39m [35m0[39m[33m,[39m y[33m:[39m [35m20[39m }}[0m
13:29:01.535 
13:29:01.535 Expected ',', got 'className'
13:29:01.535 
13:29:01.535 
13:29:01.535 ./museu-casa-borges-react/src/app/galerias/oficina-tinta-terra/page.tsx:98:18
13:29:01.535 Parsing ecmascript source code failed
13:29:01.535 [0m [90m  96 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mOficinaPage[39m() {
13:29:01.535  [90m  97 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Header da galeria */[39m}
13:29:01.535 [31m[1m>[22m[39m[90m  98 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"py-8 border-b"[39m[33m>[39m
13:29:01.535  [90m     |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.535  [90m  99 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"container mx-auto px-4"[39m[33m>[39m
13:29:01.535  [90m 100 |[39m             [33m<[39m[33mmotion[39m[33m.[39mdiv
13:29:01.535  [90m 101 |[39m               initial[33m=[39m{{ opacity[33m:[39m [35m0[39m[33m,[39m y[33m:[39m [35m20[39m }}[0m
13:29:01.535 
13:29:01.535 Expected ',', got 'className'
13:29:01.535 
13:29:01.535 
13:29:01.535 ./museu-casa-borges-react/src/app/galerias/oficina-tinta-terra/page.tsx:98:18
13:29:01.535 Parsing ecmascript source code failed
13:29:01.535 [0m [90m  96 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mOficinaPage[39m() {
13:29:01.535  [90m  97 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Header da galeria */[39m}
13:29:01.535 [31m[1m>[22m[39m[90m  98 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"py-8 border-b"[39m[33m>[39m
13:29:01.535  [90m     |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.535  [90m  99 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"container mx-auto px-4"[39m[33m>[39m
13:29:01.536  [90m 100 |[39m             [33m<[39m[33mmotion[39m[33m.[39mdiv
13:29:01.536  [90m 101 |[39m               initial[33m=[39m{{ opacity[33m:[39m [35m0[39m[33m,[39m y[33m:[39m [35m20[39m }}[0m
13:29:01.536 
13:29:01.536 Expected ',', got 'className'
13:29:01.536 
13:29:01.536 
13:29:01.536 ./museu-casa-borges-react/src/app/galerias/page.tsx:59:18
13:29:01.536 Parsing ecmascript source code failed
13:29:01.536 [0m [90m 57 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mGaleriasPage[39m() {
13:29:01.536  [90m 58 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Hero section com imagem de fundo */[39m}
13:29:01.536 [31m[1m>[22m[39m[90m 59 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"relative h-[60vh] flex items-center justify-center overflow-hidden"[39m[33m>[39m
13:29:01.536  [90m    |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.536  [90m 60 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"absolute inset-0"[39m[33m>[39m
13:29:01.536  [90m 61 |[39m             [33m<[39m[33mImage[39m
13:29:01.536  [90m 62 |[39m               src[33m=[39m[32m"/INDEX/fundo1.jpg"[39m[0m
13:29:01.536 
13:29:01.536 Expected ',', got 'className'
13:29:01.536 
13:29:01.536 
13:29:01.536 ./museu-casa-borges-react/src/app/galerias/page.tsx:59:18
13:29:01.536 Parsing ecmascript source code failed
13:29:01.536 [0m [90m 57 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mGaleriasPage[39m() {
13:29:01.536  [90m 58 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Hero section com imagem de fundo */[39m}
13:29:01.536 [31m[1m>[22m[39m[90m 59 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"relative h-[60vh] flex items-center justify-center overflow-hidden"[39m[33m>[39m
13:29:01.536  [90m    |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.536  [90m 60 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"absolute inset-0"[39m[33m>[39m
13:29:01.536  [90m 61 |[39m             [33m<[39m[33mImage[39m
13:29:01.536  [90m 62 |[39m               src[33m=[39m[32m"/INDEX/fundo1.jpg"[39m[0m
13:29:01.536 
13:29:01.536 Expected ',', got 'className'
13:29:01.536 
13:29:01.536 
13:29:01.536 ./museu-casa-borges-react/src/app/galerias/visita-ufmt/page.tsx:98:18
13:29:01.536 Parsing ecmascript source code failed
13:29:01.536 [0m [90m  96 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mVisitaUFMTPage[39m() {
13:29:01.537  [90m  97 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Header da galeria */[39m}
13:29:01.537 [31m[1m>[22m[39m[90m  98 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"py-8 border-b"[39m[33m>[39m
13:29:01.537  [90m     |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.537  [90m  99 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"container mx-auto px-4"[39m[33m>[39m
13:29:01.537  [90m 100 |[39m             [33m<[39m[33mmotion[39m[33m.[39mdiv
13:29:01.537  [90m 101 |[39m               initial[33m=[39m{{ opacity[33m:[39m [35m0[39m[33m,[39m y[33m:[39m [35m20[39m }}[0m
13:29:01.537 
13:29:01.537 Expected ',', got 'className'
13:29:01.537 
13:29:01.537 
13:29:01.537 ./museu-casa-borges-react/src/app/galerias/visita-ufmt/page.tsx:98:18
13:29:01.537 Parsing ecmascript source code failed
13:29:01.537 [0m [90m  96 |[39m [36mexport[39m [36mdefault[39m [36mfunction[39m [33mVisitaUFMTPage[39m() {
13:29:01.537  [90m  97 |[39m   [36mreturn[39m (        {[90m/* AIDEV-NOTE: Header da galeria */[39m}
13:29:01.537 [31m[1m>[22m[39m[90m  98 |[39m         [33m<[39m[33msection[39m className[33m=[39m[32m"py-8 border-b"[39m[33m>[39m
13:29:01.537  [90m     |[39m                  [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.537  [90m  99 |[39m           [33m<[39m[33mdiv[39m className[33m=[39m[32m"container mx-auto px-4"[39m[33m>[39m
13:29:01.537  [90m 100 |[39m             [33m<[39m[33mmotion[39m[33m.[39mdiv
13:29:01.537  [90m 101 |[39m               initial[33m=[39m{{ opacity[33m:[39m [35m0[39m[33m,[39m y[33m:[39m [35m20[39m }}[0m
13:29:01.537 
13:29:01.537 Expected ',', got 'className'
13:29:01.537 
13:29:01.537 
13:29:01.537 ./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:4:1
13:29:01.537 Module not found: Can't resolve '@/components/ui/AuthorCredit'
13:29:01.537 [0m [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.537  [90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.537 [31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.537  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.537  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.538  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m
13:29:01.538  [90m 7 |[39m [36mimport[39m { [33mBadge[39m } [36mfrom[39m [32m'@/components/ui/badge'[39m[0m
13:29:01.538 
13:29:01.538 Import map: aliased to relative './src/components/ui/AuthorCredit' inside of [project]/museu-casa-borges-react
13:29:01.538 
13:29:01.538 
13:29:01.538 https://nextjs.org/docs/messages/module-not-found
13:29:01.538 
13:29:01.538 
13:29:01.538 ./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:4:1
13:29:01.538 Module not found: Can't resolve '@/components/ui/AuthorCredit'
13:29:01.538 [0m [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.538  [90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.538 [31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.538  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.538  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.538  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m
13:29:01.538  [90m 7 |[39m [36mimport[39m { [33mBadge[39m } [36mfrom[39m [32m'@/components/ui/badge'[39m[0m
13:29:01.538 
13:29:01.538 Import map: aliased to relative './src/components/ui/AuthorCredit' inside of [project]/museu-casa-borges-react
13:29:01.538 
13:29:01.538 
13:29:01.538 https://nextjs.org/docs/messages/module-not-found
13:29:01.538 
13:29:01.538 
13:29:01.538 ./museu-casa-borges-react/src/app/casas/page.tsx:4:1
13:29:01.538 Module not found: Can't resolve '@/components/ui/AuthorCredit'
13:29:01.538 [0m [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.538  [90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.538 [31m[1m>[22m[39m[90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.538  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.538  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.538  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m
13:29:01.538  [90m 7 |[39m [36mimport[39m { [33mBadge[39m } [36mfrom[39m [32m'@/components/ui/badge'[39m[0m
13:29:01.538 
13:29:01.538 Import map: aliased to relative './src/components/ui/AuthorCredit' inside of [project]/museu-casa-borges-react
13:29:01.539 
13:29:01.539 
13:29:01.539 https://nextjs.org/docs/messages/module-not-found
13:29:01.539 
13:29:01.539 
13:29:01.539 ./museu-casa-borges-react/src/app/casas/page.tsx:4:1
13:29:01.539 Module not found: Can't resolve '@/components/ui/AuthorCredit'
13:29:01.539 [0m [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.539  [90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.568  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.568  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.568  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m
13:29:01.568  [90m 7 |[39m [36mimport[39m { [33mBadge[39m } [36mfrom[39m [32m'@/components/ui/badge'[39m[0m
13:29:01.568 
13:29:01.568 Import map: aliased to relative './src/components/ui/AuthorCredit' inside of [project]/museu-casa-borges-react
13:29:01.568 
13:29:01.568 
13:29:01.568 https://nextjs.org/docs/messages/module-not-found
13:29:01.568 
13:29:01.568 
13:29:01.568 ./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:3:1
13:29:01.568 Module not found: Can't resolve '@/components/ui/ContentPage'
13:29:01.568 [0m [90m 1 |[39m [36mimport[39m { [33mMetadata[39m } [36mfrom[39m [32m'next'[39m
13:29:01.569  [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.569 [31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.569  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.569  [90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.569  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.569  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m[0m
13:29:01.569 
13:29:01.569 Import map: aliased to relative './src/components/ui/ContentPage' inside of [project]/museu-casa-borges-react
13:29:01.569 
13:29:01.569 
13:29:01.569 https://nextjs.org/docs/messages/module-not-found
13:29:01.569 
13:29:01.569 
13:29:01.569 ./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:3:1
13:29:01.569 Module not found: Can't resolve '@/components/ui/ContentPage'
13:29:01.569 [0m [90m 1 |[39m [36mimport[39m { [33mMetadata[39m } [36mfrom[39m [32m'next'[39m
13:29:01.569  [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.569 [31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.569  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.569  [90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.569  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.569  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m[0m
13:29:01.569 
13:29:01.569 Import map: aliased to relative './src/components/ui/ContentPage' inside of [project]/museu-casa-borges-react
13:29:01.569 
13:29:01.574 
13:29:01.574 https://nextjs.org/docs/messages/module-not-found
13:29:01.574 
13:29:01.574 
13:29:01.574 ./museu-casa-borges-react/src/app/casas/page.tsx:3:1
13:29:01.574 Module not found: Can't resolve '@/components/ui/ContentPage'
13:29:01.574 [0m [90m 1 |[39m [36mimport[39m { [33mMetadata[39m } [36mfrom[39m [32m'next'[39m
13:29:01.574  [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.574 [31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.574  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.574  [90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.574  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.574  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m[0m
13:29:01.574 
13:29:01.574 Import map: aliased to relative './src/components/ui/ContentPage' inside of [project]/museu-casa-borges-react
13:29:01.574 
13:29:01.574 
13:29:01.574 https://nextjs.org/docs/messages/module-not-found
13:29:01.574 
13:29:01.574 
13:29:01.574 ./museu-casa-borges-react/src/app/casas/page.tsx:3:1
13:29:01.574 Module not found: Can't resolve '@/components/ui/ContentPage'
13:29:01.574 [0m [90m 1 |[39m [36mimport[39m { [33mMetadata[39m } [36mfrom[39m [32m'next'[39m
13:29:01.575  [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.575 [31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.575  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.575  [90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.575  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.575  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m[0m
13:29:01.575 
13:29:01.575 Import map: aliased to relative './src/components/ui/ContentPage' inside of [project]/museu-casa-borges-react
13:29:01.575 
13:29:01.575 
13:29:01.575 https://nextjs.org/docs/messages/module-not-found
13:29:01.575 
13:29:01.575 
13:29:01.575 ./museu-casa-borges-react/src/app/comunidades/page.tsx:3:1
13:29:01.575 Module not found: Can't resolve '@/components/ui/ContentPage'
13:29:01.575 [0m [90m 1 |[39m [36mimport[39m { [33mMetadata[39m } [36mfrom[39m [32m'next'[39m
13:29:01.575  [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.575 [31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.575  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.575  [90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.575  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.575  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m[0m
13:29:01.575 
13:29:01.575 Import map: aliased to relative './src/components/ui/ContentPage' inside of [project]/museu-casa-borges-react
13:29:01.575 
13:29:01.575 
13:29:01.576 https://nextjs.org/docs/messages/module-not-found
13:29:01.576 
13:29:01.576 
13:29:01.576 ./museu-casa-borges-react/src/app/comunidades/page.tsx:3:1
13:29:01.576 Module not found: Can't resolve '@/components/ui/ContentPage'
13:29:01.576 [0m [90m 1 |[39m [36mimport[39m { [33mMetadata[39m } [36mfrom[39m [32m'next'[39m
13:29:01.576  [90m 2 |[39m [36mimport[39m { [33mLayout[39m } [36mfrom[39m [32m'@/components/layout/Layout'[39m
13:29:01.576 [31m[1m>[22m[39m[90m 3 |[39m [36mimport[39m { [33mContentPage[39m } [36mfrom[39m [32m'@/components/ui/ContentPage'[39m
13:29:01.576  [90m   |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.576  [90m 4 |[39m [36mimport[39m { [33mAuthorCredit[39m } [36mfrom[39m [32m'@/components/ui/AuthorCredit'[39m
13:29:01.576  [90m 5 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.576  [90m 6 |[39m [36mimport[39m { [33mCard[39m[33m,[39m [33mCardContent[39m[33m,[39m [33mCardDescription[39m[33m,[39m [33mCardHeader[39m[33m,[39m [33mCardTitle[39m } [36mfrom[39m [32m'@/components/ui/card'[39m[0m
13:29:01.576 
13:29:01.576 Import map: aliased to relative './src/components/ui/ContentPage' inside of [project]/museu-casa-borges-react
13:29:01.576 
13:29:01.576 
13:29:01.576 https://nextjs.org/docs/messages/module-not-found
13:29:01.576 
13:29:01.576 
13:29:01.576 ./museu-casa-borges-react/src/app/visita/page.tsx:7:1
13:29:01.576 Export Wheelchair doesn't exist in target module
13:29:01.576 [0m [90m  5 |[39m [36mimport[39m { [33mButton[39m } [36mfrom[39m [32m'@/components/ui/button'[39m
13:29:01.576  [90m  6 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.576 [31m[1m>[22m[39m[90m  7 |[39m [36mimport[39m { 
13:29:01.576  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.576 [31m[1m>[22m[39m[90m  8 |[39m   [33mClock[39m[33m,[39m 
13:29:01.576  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.576 [31m[1m>[22m[39m[90m  9 |[39m   [33mMapPin[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 10 |[39m   [33mPhone[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 11 |[39m   [33mMail[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 12 |[39m   [33mCar[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 13 |[39m   [33mBus[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 14 |[39m   [33mWheelchair[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 15 |[39m   [33mUsers[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 16 |[39m   [33mCamera[39m[33m,[39m 
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 17 |[39m   [33mCoffee[39m[33m,[39m
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 18 |[39m   [33mGift[39m[33m,[39m
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 19 |[39m   [33mInfo[39m
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577 [31m[1m>[22m[39m[90m 20 |[39m } [36mfrom[39m [32m'lucide-react'[39m
13:29:01.577  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.577  [90m 21 |[39m [36mimport[39m [33mLink[39m [36mfrom[39m [32m'next/link'[39m
13:29:01.582  [90m 22 |[39m
13:29:01.582  [90m 23 |[39m [90m/**[39m[0m
13:29:01.582 
13:29:01.582 The export Wheelchair was not found in module [project]/museu-casa-borges-react/node_modules/lucide-react/dist/esm/lucide-react.js [app-client] (ecmascript).
13:29:01.582 Did you mean to import Wheat?
13:29:01.582 All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.
13:29:01.582 
13:29:01.582 
13:29:01.582 ./museu-casa-borges-react/src/app/visita/page.tsx:7:1
13:29:01.582 Export Wheelchair doesn't exist in target module
13:29:01.582 [0m [90m  5 |[39m [36mimport[39m { [33mButton[39m } [36mfrom[39m [32m'@/components/ui/button'[39m
13:29:01.582  [90m  6 |[39m [36mimport[39m { motion } [36mfrom[39m [32m'framer-motion'[39m
13:29:01.582 [31m[1m>[22m[39m[90m  7 |[39m [36mimport[39m { 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m  8 |[39m   [33mClock[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m  9 |[39m   [33mMapPin[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 10 |[39m   [33mPhone[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 11 |[39m   [33mMail[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 12 |[39m   [33mCar[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 13 |[39m   [33mBus[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 14 |[39m   [33mWheelchair[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 15 |[39m   [33mUsers[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 16 |[39m   [33mCamera[39m[33m,[39m 
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 17 |[39m   [33mCoffee[39m[33m,[39m
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 18 |[39m   [33mGift[39m[33m,[39m
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 19 |[39m   [33mInfo[39m
13:29:01.582  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.582 [31m[1m>[22m[39m[90m 20 |[39m } [36mfrom[39m [32m'lucide-react'[39m
13:29:01.583  [90m    |[39m [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
13:29:01.583  [90m 21 |[39m [36mimport[39m [33mLink[39m [36mfrom[39m [32m'next/link'[39m
13:29:01.583  [90m 22 |[39m
13:29:01.583  [90m 23 |[39m [90m/**[39m[0m
13:29:01.583 
13:29:01.583 The export Wheelchair was not found in module [project]/museu-casa-borges-react/node_modules/lucide-react/dist/esm/lucide-react.js [app-ssr] (ecmascript).
13:29:01.583 Did you mean to import Wheat?
13:29:01.583 All exports of the module are statically known (It doesn't have dynamic exports). So it's known statically that the requested export doesn't exist.
13:29:01.583 
13:29:01.583 
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/gabriel-garcia-marquez/page.tsx:124:8)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/gabriel-garcia-marquez/page.tsx:124:8)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/julio-cortazar/page.tsx:82:8)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/julio-cortazar/page.tsx:82:8)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/octavio-paz/page.tsx:105:8)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/octavio-paz/page.tsx:105:8)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/page.tsx:97:39)
13:29:01.583     at <unknown> (./museu-casa-borges-react/src/app/artistas/page.tsx:97:39)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/dia-meio-ambiente/page.tsx:82:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/dia-meio-ambiente/page.tsx:82:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/oficina-tinta-terra/page.tsx:98:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/oficina-tinta-terra/page.tsx:98:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/page.tsx:59:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/page.tsx:59:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/visita-ufmt/page.tsx:98:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/galerias/visita-ufmt/page.tsx:98:18)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:4:1)
13:29:01.584     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:4:1)
13:29:01.584     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/casas/page.tsx:4:1)
13:29:01.584     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/casas/page.tsx:4:1)
13:29:01.584     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.584     at <unknown> (./museu-casa-borges-react/src/app/comunidades/page.tsx:4:1)
13:29:01.584     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/comunidades/page.tsx:4:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:3:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/casas/casa-herculano/page.tsx:3:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/casas/page.tsx:3:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/casas/page.tsx:3:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/comunidades/page.tsx:3:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/comunidades/page.tsx:3:1)
13:29:01.589     at <unknown> (https://nextjs.org/docs/messages/module-not-found)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/visita/page.tsx:7:1)
13:29:01.589     at <unknown> (./museu-casa-borges-react/src/app/visita/page.tsx:7:1)
13:29:01.610 Error: Command "npm run build" exited with 1