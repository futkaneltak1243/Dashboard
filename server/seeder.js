const sqlite3 = require("sqlite3").verbose();
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");

// Open database
const db = new sqlite3.Database("database.db", (err) => {
    if (err) {
        console.error(chalk.red("Error opening database:"), err.message);
    } else {
        console.info(chalk.blue("Database opened successfully."));
    }
});

db.serialize(() => {
    // USERS
    const roles = ["Admin", "Manager", "Seller", "Delivery Agent", "Customer"];
    const statuses = ["active", "inactive", "pending"];

    const insertUser = db.prepare(`
    INSERT INTO users (fullname, username, email, role, status, avatar) VALUES (?, ?, ?, ?, ?, ?)
  `);

    const runUser = (fullname, username, email, role, status, avatar) => {
        insertUser.run([fullname, username, email, role, status, avatar], (err) => {
            if (err) console.error(chalk.red("Failed to insert user:"), err.message);
        });
    };

    runUser("Furkan Eltakriti", "furkaneltakriti", "ft.142001@gmail.com", "Super Admin", "active", null);
    runUser("Lulu Farhat", "lulufarhat", faker.internet.email({ firstName: "Lulu", lastName: "Farhat" }), "Admin", "active", null);

    for (let i = 0; i < 98; i++) {
        runUser(
            faker.person.fullName(),
            faker.internet.username(),
            faker.internet.email(),
            faker.helpers.arrayElement(roles),
            faker.helpers.arrayElement(statuses),
            faker.image.avatar()
        );
    }

    insertUser.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing users insert:"), err.message);
        else console.log(chalk.green("Users seeded."));
    });

    // PRODUCTS
    const insertProduct = db.prepare(`
    INSERT INTO products (name, price, images, isfavorite) VALUES (?, ?, ?, ?)
  `);

    const runProduct = (name, price, images, isfavorite) => {
        insertProduct.run([name, price, images, isfavorite], (err) => {
            if (err) console.error(chalk.red("Failed to insert product:"), err.message);
        });
    };

    for (let i = 0; i < 25; i++) {
        runProduct(
            faker.commerce.productName(),
            faker.commerce.price({ min: 5, max: 500 }),
            JSON.stringify([faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()]),
            faker.datatype.boolean() ? 1 : 0
        );
    }

    insertProduct.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing products insert:"), err.message);
        else console.log(chalk.green("Products seeded."));
    });

    // PARTNERS
    const partnerTypes = ["Supplier", "Distributor", "Investor", "Partner"];
    const insertPartner = db.prepare(`
    INSERT INTO partners (name, company, email, type, joind) VALUES (?, ?, ?, ?, ?)
  `);

    const runPartner = (name, company, email, type, joind) => {
        insertPartner.run([name, company, email, type, joind], (err) => {
            if (err) console.error(chalk.red("Failed to insert partner:"), err.message);
        });
    };

    for (let i = 0; i < 15; i++) {
        runPartner(
            faker.person.fullName(),
            faker.company.name(),
            faker.internet.email(),
            faker.helpers.arrayElement(partnerTypes),
            faker.date.past().toISOString().split("T")[0]
        );
    }

    insertPartner.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing partners insert:"), err.message);
        else console.log(chalk.green("Partners seeded."));
    });

    // EXHIBITIONS
    const exhibitionStatuses = ["Upcoming", "Ongoing", "Completed", "Planned"];
    const insertExhibition = db.prepare(`
    INSERT INTO exhibitions (name, title, location, organizer, dates, capacity, status) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

    const runExhibition = (name, title, location, organizer, dates, capacity, status) => {
        insertExhibition.run([name, title, location, organizer, dates, capacity, status], (err) => {
            if (err) console.error(chalk.red("Failed to insert exhibition:"), err.message);
        });
    };

    for (let i = 0; i < 20; i++) {
        runExhibition(
            faker.company.name(),
            faker.commerce.productAdjective() + " Expo",
            faker.location.city(),
            faker.company.name(),
            faker.date.future().toISOString().split("T")[0],
            faker.number.int({ min: 50, max: 1000 }),
            faker.helpers.arrayElement(exhibitionStatuses)
        );
    }

    insertExhibition.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing exhibitions insert:"), err.message);
        else console.log(chalk.green("Exhibitions seeded."));
    });

    // ORDERS
    const orderStatuses = ["Completed", "Processing", "Rejected", "On Hold", "In Transit"];

    const insertOrder = db.prepare(`
    INSERT INTO orders (user_id, address, date, status) VALUES (?, ?, ?, ?)
  `);

    const runOrder = (user_id, address, date, status) => {
        insertOrder.run([user_id, address, date, status], (err) => {
            if (err) console.error(chalk.red("Failed to insert order:"), err.message);
        });
    };

    for (let i = 0; i < 50; i++) {
        runOrder(
            faker.number.int({ min: 1, max: 100 }),
            faker.location.streetAddress(),
            faker.date.recent().toISOString().split("T")[0],
            faker.helpers.arrayElement(orderStatuses)
        );
    }

    insertOrder.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing orders insert:"), err.message);
        else console.log(chalk.green("Orders seeded."));
    });

    // ORDERS_PRODUCTS
    const insertOrderProduct = db.prepare(`
    INSERT INTO orders_products (order_id, product_id) VALUES (?, ?)
  `);

    const runOrderProduct = (order_id, product_id) => {
        insertOrderProduct.run([order_id, product_id], (err) => {
            if (err) console.error(chalk.red("Failed to insert order_product:"), err.message);
        });
    };

    for (let i = 0; i < 200; i++) {
        const order_id = (i < 50) ? i + 1 : faker.number.int({ min: 1, max: 50 });
        const product_id = faker.number.int({ min: 1, max: 25 });
        runOrderProduct(order_id, product_id);
    }

    insertOrderProduct.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing orders_products insert:"), err.message);
        else console.log(chalk.green("Orders_Products seeded."));
    });
});

db.close((err) => {
    if (err) console.error(chalk.red("Error closing database:"), err.message);
    else console.log(chalk.blue("Seeding completed successfully."));
});

