/**
 * OrganizationInfo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    legalName: {
      //  -Legal Name of Organization Applying: 
      type: 'string',
      //required: 'true',
      unique: true // Yes unique one
    },
    yearFounded: {
      // -Year Founded 
      type: 'number'
    },
    currentOperatingBudget: {
      // -Current Operating Budget 
      type: 'number'
    },
    director: {
      type: 'string',
    },
    phone: {
      // -Phone Number 
      type: 'number',
    },
    contactPerson: {
      //-Contact person/title/phone number 
      type: 'string',
    },
    contactPersonTitle: {
      //  contact person's title 
      type: 'string',
    },
    contactPersonPhoneNumber: {
      type: 'number'
    },
    email: {
      //  email 
      type: 'string',
    },
    address: {
      //-Address (principal/administrative office) 
      type: 'string',
    },
    city: {
      //  city 
      type: 'string',
    },
    state: {
      //  state 
      type: 'string',
    },
    zip: {
      // -zip
      type: 'number'
    },
    fax: {
      // -fax number
      type: 'number'
    },
    organization: {
      model: 'organization',
      unique: true
    }

  },

};

