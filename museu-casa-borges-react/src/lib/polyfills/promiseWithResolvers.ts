/**
 * Polyfill de Promise.withResolvers para ambientes que ainda não suportam a API nativamente.
 *
 * Contexto:
 * - O pacote pdfjs-dist (usado por react-pdf) invoca Promise.withResolvers em ambientes Node.
 * - Em Node < 22 essa função não existe, causando o erro: "Promise.withResolvers is not a function".
 *
 * Este polyfill adiciona Promise.withResolvers quando ausente, garantindo compatibilidade
 * durante SSR (Node) e no cliente, evitando o crash em tempo de execução.
 */

// AIDEV: Augmentação de tipos para o construtor de Promise
declare global {
  interface PromiseConstructor {
    /**
     * Retorna um objeto com { promise, resolve, reject } permitindo criar e controlar uma Promise.
     * Tipagem genérica T para o valor resolvido.
     */
    withResolvers?<T = unknown>(): {
      promise: Promise<T>;
      resolve: (value: T | PromiseLike<T>) => void;
      reject: (reason?: any) => void;
    };
  }
}

// AIDEV: Implementação do polyfill somente se a função não existir
if (typeof (Promise as any).withResolvers !== 'function') {
  (Promise as any).withResolvers = function <T = unknown>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: any) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

export {}; // AIDEV: Garantir que este arquivo é tratado como módulo