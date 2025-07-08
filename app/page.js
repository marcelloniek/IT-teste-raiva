"use client";

import { useState } from 'react';

const domande = [
  "Faccio fatica a controllare la mia rabbia nelle situazioni quotidiane, anche se piccole o banali.",
  "Perdo facilmente la pazienza ed esplodo frequentemente con persone vicine o sconosciute.",
  "Ho episodi di rabbia così intensi da pentirmi successivamente delle parole o delle azioni compiute.",
  "Ho difficoltà a perdonare o dimenticare quando qualcuno mi irrita o mi frustra, accumulando risentimento.",
  "Avverto fisicamente la rabbia in modo intenso, con aumento del battito cardiaco, tensione muscolare o respiro accelerato.",
  "Ho recentemente pensato di fare del male fisicamente a qualcuno o a me stesso(a) a causa dell'intensità della rabbia provata.", // FLAG
  "I miei rapporti familiari, lavorativi o sociali sono stati negativamente influenzati dalla mia frequente irritabilità.",
  "Ho notato che la mia rabbia sembra aumentare nel tempo invece di migliorare o essere controllata.",
  "Tendo a reagire in modo aggressivo o ostile, anche quando preferirei risolvere le cose in modo tranquillo.",
  "Mi sento spesso pentito(a) o imbarazzato(a) per il modo in cui ho reagito durante gli episodi di rabbia."
];

export default function TestRabbia() {
  const [risposte, setRisposte] = useState(Array(10).fill(0));
  const [risultato, setRisultato] = useState(null);
  const [indiceAttuale, setIndiceAttuale] = useState(0);

  const registraRisposta = (valore) => {
    const nuoveRisposte = [...risposte];
    nuoveRisposte[indiceAttuale] = valore;
    setRisposte(nuoveRisposte);

    if (indiceAttuale < domande.length - 1) {
      setIndiceAttuale(indiceAttuale + 1);
    } else {
      calcolaRisultato(nuoveRisposte);
    }
  };

  const calcolaRisultato = (risposte) => {
    if (risposte[5] >= 3) { // FLAG
      setRisultato("ROSSO");
    } else {
      const somma = risposte.reduce((a, b) => a + b, 0);
      if (somma <= 20) setRisultato("VERDE");
      else if (somma <= 35) setRisultato("GIALLO");
      else setRisultato("ROSSO");
    }
  };

  const riavviaTest = () => {
    setRisposte(Array(10).fill(0));
    setRisultato(null);
    setIndiceAttuale(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!risultato ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{`Test della Rabbia`}</h2>
          <p className="mb-4">{domande[indiceAttuale]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registraRisposta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Domanda {indiceAttuale + 1} di {domande.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{`Risultato: {risultato}`}</h2>
          {risultato === "VERDE" && <p>{`Gestisci molto bene questo aspetto e sei emotivamente equilibrato(a). Potrai essere di grande aiuto ad altre persone che necessitano sostegno.`}</p>}
          {risultato === "GIALLO" && <p>{`Ci sono chiari segnali di difficoltà emotive che richiedono attenzione e che, con determinazione e aiuto, possono essere superati.`}</p>}
          {risultato === "ROSSO" && <p>{`I tuoi problemi emotivi legati a questo tema richiedono necessariamente l'intervento di un professionista. Ti consigliamo di cercare rapidamente l'aiuto di un medico o psicologo.`}</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={riavviaTest}
          >
            Ripeti il test
          </button>
        </>
      )}
    </div>
  );
}
