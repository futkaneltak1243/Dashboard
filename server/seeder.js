const sqlite3 = require("sqlite3").verbose();
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

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
        INSERT INTO users (fullname, username, email, password, role, status, avatar) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);


    const runUser = (fullname, username, email, role, status, avatar) => {
        // Generate a random password
        const plainPassword = faker.internet.password({ length: 10 });
        // Hash the password before storing
        const hashedPassword = bcrypt.hashSync(plainPassword, 10);

        insertUser.run(
            [fullname, username, email, hashedPassword, role, status, avatar],
            (err) => {
                if (err) console.error(chalk.red("Failed to insert user:"), err.message);
            }
        );
    };

    runUser("Furkan Eltakriti", "furkaneltakriti", "ft.142001@gmail.com", "Super Admin", "active", "http://localhost:3000/uploads/profile.jpeg");

    for (let i = 0; i < 99; i++) {
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

    // Folder with images
    const uploadsDir = path.join(__dirname, "uploads");

    // Get all image filenames (0.jpg to 38.jpg)
    const allImages = fs.readdirSync(uploadsDir).filter(file => file.endsWith(".jpg"));

    // Function to get random images
    function getRandomImages(min = 3, max = 5) {
        const count = Math.floor(Math.random() * (max - min + 1)) + min;
        const selected = [];
        const copy = [...allImages]; // clone array to avoid duplicates
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * copy.length);
            selected.push(copy[idx]);
            copy.splice(idx, 1); // remove used image
        }
        return selected.map(f => `http://localhost:3000/uploads/${f}`); // full URL
    }

    // Function to insert a product
    const runProduct = (name, price, images, isfavorite) => {
        insertProduct.run([name, price, JSON.stringify(images), isfavorite], (err) => {
            if (err) console.error(chalk.red("Failed to insert product:"), err.message);
        });
    };

    // Seed products
    for (let i = 0; i < 25; i++) {
        runProduct(
            faker.commerce.productName(),
            faker.commerce.price({ min: 5, max: 500 }),
            getRandomImages(3, 5),
            faker.datatype.boolean() ? 1 : 0
        );
    }

    // Finalize
    insertProduct.finalize((err) => {
        if (err) console.error(chalk.red("Error finalizing products insert:"), err.message);
        else console.log(chalk.green("Products seeded."));
    });

    // PARTNERS
    const partnerTypes = ["Supplier", "Distributor", "Investor", "Partner"];
    const insertPartner = db.prepare(`
    INSERT INTO partners (name, company, email, type, joined) VALUES (?, ?, ?, ?, ?)
  `);

    const runPartner = (name, company, email, type, joined) => {
        insertPartner.run([name, company, email, type, joined], (err) => {
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
      INSERT INTO exhibitions (name, title, location, organizer, start_date, end_date, capacity, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const runExhibition = (name, title, location, organizer, startDate, endDate, capacity, status) => {
        insertExhibition.run([name, title, location, organizer, startDate, endDate, capacity, status], (err) => {
            if (err) console.error(chalk.red("Failed to insert exhibition:"), err.message);
        });
    };

    for (let i = 0; i < 20; i++) {
        const startDate = faker.date.future();
        const endDate = faker.date.between({ from: startDate, to: new Date(startDate.getFullYear(), startDate.getMonth() + 2) });

        runExhibition(
            faker.company.name(),
            faker.commerce.productAdjective() + " Expo",
            faker.location.city(),
            faker.company.name(),
            startDate.toISOString().split("T")[0],
            endDate.toISOString().split("T")[0],
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

    const today = new Date();

    for (let i = 0; i < 50; i++) {
        // Calculate a date between 20 days ago and today
        const date = new Date(today);
        date.setDate(today.getDate() - 20 + Math.floor((i / 49) * 20)); // Spread over 20 days

        runOrder(
            faker.number.int({ min: 1, max: 100 }),
            faker.location.streetAddress(),
            date.toISOString().split("T")[0],
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

// NOTIFICATIONS
const insertNotification = db.prepare(`
        INSERT INTO notifications (type, message) VALUES (?, ?)
    `);

// We'll need to read users and orders to build notifications
const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, fullname, username, role FROM users WHERE role != 'Super Admin'`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getOrders = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT id, user_id FROM orders`, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

async function seedNotifications() {
    try {
        const users = await getUsers();
        const orders = await getOrders();

        // Collect all notifications in an array first
        const notifications = [];

        // User-created
        users.slice(0, 10).forEach((user) => {
            notifications.push({
                type: "user_created",
                message: `${user.fullname} created his account`,
            });
        });

        // User-edited
        users.slice(10, 20).forEach((user) => {
            notifications.push({
                type: "user_edited",
                message: `${user.fullname} edited his account`,
            });
        });

        // User-deleted
        users.slice(20, 25).forEach((user) => {
            notifications.push({
                type: "user_deleted",
                message: `${user.fullname} deleted his account`,
            });
        });

        // Order-created
        for (const order of orders.slice(0, 20)) {
            const user = users.find((u) => u.id === order.user_id);
            if (user) {
                notifications.push({
                    type: "order_created",
                    message: `${user.fullname} made the order ${order.id}`,
                });
            }
        }

        function strongShuffle(array) {
            // Run Fisher–Yates shuffle multiple times
            for (let round = 0; round < 3; round++) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            // Second pass: avoid consecutive same types
            for (let i = 1; i < array.length; i++) {
                if (array[i].type === array[i - 1].type) {
                    const swapIndex = array.findIndex(
                        (n, idx) => idx > i && n.type !== array[i].type
                    );
                    if (swapIndex !== -1) {
                        [array[i], array[swapIndex]] = [array[swapIndex], array[i]];
                    }
                }
            }
            return array;
        }

        strongShuffle(notifications)

        // Now insert in randomized order
        notifications.forEach(({ type, message }) => {
            insertNotification.run([type, message], (err) => {
                if (err) console.error(chalk.red("Failed to insert notification:"), err.message);
            });
        });

        console.log(chalk.green("Notifications seeded."));

        insertNotification.finalize(() => {
            db.close((err) => {
                if (err) console.error(chalk.red("Error closing database:"), err.message);
                else console.log(chalk.blue("Seeding completed successfully."));
            });
        });
    } catch (err) {
        console.error(chalk.red("Error seeding notifications:"), err.message);
    }
}

seedNotifications();





