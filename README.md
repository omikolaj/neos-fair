## Neos Fair
React-Redux application inspired by craigslist and offerup. Place where people can buy and sell items. This applications implements security measures for authentication. Upon signing up user's account is charged with $1000.00 dollars. Allowing them to purchase items which are added to their past orders section for future review.

## Features and Technologies
- React for component management and presentation logic
- Redux for state management and asynchronous Javascript back-end API calls
- CSS Modules
- OmniAuth Github strategy (Login with GitHub)
- Custom login and sign up flow system
- Full CRUD support (Create, Retrieve, Update, Delete) with error handling
- Ruby on Rails powered back-end API for database persistence
- Stateless back-end API using JWT (Jason Web Token) authentication system
- Each API end-point is guarded to only allow authenticated requests access data
- All requests to the server utilize asynchronous Javascript fetch api with error handeling
- PostgreSQL database

## Blog


## Usage
This application has been deployed to Heroku. You can find the live version at 
Manual set-up:
  - Clone the repository
  - cd into /server-side run 'bundle-install'
  - run rake db:create (Make sure to have postgreSQL server installed)
  - run rake db:migrate
  - run rake db:seed
  - run rails s -p 3001
  - cd into /client-side
  - set up a proxy in the package.json file "proxy": "http://localhost:3001" NOTE: (Some routes may not work due to environment variables not being set)
  - run 'npm-install && start'

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/omikolaj/neos-fair. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License
This project is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT)

  

