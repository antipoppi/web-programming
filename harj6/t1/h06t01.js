function drawCanvas() {
            // haetaan canvas
            var canvas = document.getElementById("myCanvas");
            let ctx = canvas.getContext("2d");
            // lisätään "otsikko"
            ctx.font = "30px Arial";
            ctx.fillText("Canvas-harjoitus: Piirrä Ruotsin ja Guyanan liput", 10, 30);

            /*
                lisätään Ruotsin lipulle pohja
                (tarkistin mallin wikipediasta js samalla sain tarkat värit)
            */

            // lisätään lipulle reunat
            ctx.strokeRect(10, 60, 667, 400);
            // lisätään ruotsin lipun tausta
            ctx.fillStyle = "#006aa9";
            ctx.fillRect(10, 60, 667, 400)
            // lisätään ruotsin lippuun risti
            ctx.fillStyle = "#fecd00";
            ctx.fillRect(10, 220, 667, 80)
            ctx.fillRect(210, 60, 80, 400)

            /*
                lisätään Guyanan lipulle pohja
                (tarkistin mallin wikipediasta ja samalla sain tarkat värit)
            */
            ctx.strokeRect(10, 480, 667, 400);
            // lisätään Guyanan lipun tausta
            ctx.fillStyle = "#009f47";
            ctx.fillRect(10, 480, 667, 400)
            // tehdään kolmiot lippuun
            // valkoinen kolmio
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(10, 480);
            ctx.lineTo(677, 680);
            ctx.lineTo(10, 880);
            ctx.lineTo(10, 480);
            ctx.closePath();
            ctx.fill();
            // keltainen kolmio
            ctx.fillStyle = "#fcd20f";
            ctx.beginPath();
            ctx.moveTo(10, 500);
            ctx.lineTo(627, 680);
            ctx.lineTo(10, 860);
            ctx.lineTo(10, 500);
            ctx.closePath();
            ctx.fill();
            // musta kolmio
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(10, 480);
            ctx.lineTo(339, 680);
            ctx.lineTo(10, 880);
            ctx.lineTo(10, 480);
            ctx.closePath();
            ctx.fill();
            // punainen kolmio
            ctx.fillStyle = "#cb0c23";
            ctx.beginPath();
            ctx.moveTo(10, 500);
            ctx.lineTo(307, 680);
            ctx.lineTo(10, 860);
            ctx.lineTo(10, 500);
            ctx.closePath();
            ctx.fill();
        }