
export const Reader =  {
  read : function (str : string) {
    if (str.indexOf("data:audio/mid;base64,")) return this.read_base64(str);
    return this.read_web(str)
  },

  read_base64 : (str : string) : Uint8Array => {
    if (str.indexOf("data:audio/mid;base64,")) throw Error("Not a valid base64 midi str")

    str = str.replace("data:audio/mid;base64,", "")
    
    return new Uint8Array(atob(str).split("").map(_=>_.charCodeAt(0)))
  },

  async read_web(url: string): Promise<Uint8Array> {
    let body = (await fetch(url)).body
    return (await body?.getReader().read())?.value || new Uint8Array()
  }
}
