Rex(function ({ atom, contains, hook }) {

  /**
   * Extensao do modulo atom, o decorador change notifica o metodo
   * decorado quando o atributo identificado for alterado
   */
  Object.assign(atom, {
    change(...properties) {
      return function (target, prop, descriptor) {

        /**
         * Notifica o metodo que fora decorado, para receber o novo valor da
         * propriedade alterado
         */
        function hookCallback(name, oldValue, newValue) {
          contains(name, properties) && (this[prop](newValue, oldValue, name));
        }

        /**
         * Altera o metodo attributeChangedCallback para incluir o hook, no momento
         * que este metodo for chamado, sera repassado para o metodo que fora decorado
         */
        hook.before(target, 'attributeChangedCallback', hookCallback);

        return descriptor;

      };
    }
  });

});