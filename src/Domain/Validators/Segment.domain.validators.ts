export class Segment {
  private readonly segment: string;

  constructor(segment: string) {
    if (
      ![
        "local",
        "delivery"
      ].includes(String(segment).toLowerCase())
    ) {
      throw new Error("Este segmento não existe");
    }

    if (!segment || segment.trim() === '') {
      throw new Error("Segmento é o obrigatório");
    }

    if (typeof segment !== 'string') {
      throw new Error("O tipo do segmento pode ser apenas string.");
    }
    this.segment = segment;
  }

  getValue(): string {
    return this.segment;
  }
}