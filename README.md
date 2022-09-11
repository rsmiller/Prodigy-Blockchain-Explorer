# Prodigy Blockchain Explorer
This project contains the blockchain explorer code for Prodigy Blockchain, a certificate document-based blockchain. This app will show you to see all the blocks, search them, and allow you to buy stuff with tokens/coins.

Please read the [documentation regarding Prodigy Blockchain](https://prodigychain.bit.ai/rdc/j9xA8uLDLVOgIZtL) to understand the use cases.

## Use Case for Prodigy Blockchain
The use case for Prodigy is storing simple documents like manufacturing product certificates, certificates of conformance, certificates of test, and more. These documents are encrypted and stored in a block on a chain that is accessible via a unique identifier like a serial number, document number, or order number. 

This product is not made for worldwide general use. This is made for manufacturing companies to allow their customers access to those certificates in a unique and marketable way.

Mining is simply an audit mechanism and doesn't need to exist outside of auditing in this use case. However, for marketability, mining allows employees of a company to earn tokens/coins that can be spent for days off, company merchandise, or whatever in a company store. How this is done is in the block explorer project. 

## Explorer Installation
This is an Angular project so you will need to know how to serve and distribute Angular web applications. Might I suggest [https://angular.io/guide/setup-local](https://angular.io/guide/setup-local) to get you started.

Once you download the code you will want to modify main.ts to include your server that hosts a node.
```bash
export function getAPIUrl() {
  //return "https://YOUR_SERVER_HOSTING_A_NODE.com/api/v1/";
  //return "http://555.555.555.555/api/v1/";
  //return "https://localhost:5001/api/v1/";
}
```
There is no Docker integration at this time, but feel free to add it. Once you are ready to deploy, build your app, go to the distribute folder, and copy-paste to your web directory.

## Support
I created Prodigy Blockchain as a proof of concept and something to cure boredom. I am not really supporting this or these projects actively at this time so feel free to branch and do as you wish. You can reach me here: www.linkedin.com/in/more-guids

## License
Do as ye will but if ye a be making booty off this code a kickback of a new phone, camping equipment, computer, couch, or car would be appreciated, yyar.
