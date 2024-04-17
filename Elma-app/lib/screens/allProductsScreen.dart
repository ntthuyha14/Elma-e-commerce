import 'package:elma/api/api_products.dart';
import 'package:elma/constants/constant.dart';
import 'package:elma/models/category.dart';
import 'package:elma/screens/productScreen.dart';
import 'package:flutter/material.dart';

import '../models/products.dart';

class AllProductsScreen extends StatefulWidget {
  Categories categories;
  AllProductsScreen({super.key, required this.categories});

  @override
  State<AllProductsScreen> createState() => _AllProductsScreenState();
}

class _AllProductsScreenState extends State<AllProductsScreen> {
  Future<List<Product>> getListProductCategory(categoryId) async {
    return await APIProduct.getListProductCategory(categoryId);
  }

  String searchText = '';



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "All Products",
        ),
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
        leading: BackButton(),
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: EdgeInsets.all(5),
                    height: 50,
                    width: MediaQuery.of(context).size.width / 1.5,
                    decoration: BoxDecoration(
                      color: Colors.black12.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: TextFormField(
                      decoration: InputDecoration(
                        prefixIcon: Icon(
                          Icons.search,
                          color: kPrimaryColor,
                        ),
                        border: InputBorder.none,
                        label: Text(
                          'Find your product',
                        ),
                      ),
                      onChanged: (value) => {
                        setState(() {
                          searchText = value;
                        })
                      },
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Container(
                    height: 50,
                    width: MediaQuery.of(context).size.width / 6,
                    decoration: BoxDecoration(
                      color: Colors.black12.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Center(
                      child: Icon(
                        Icons.notifications,
                        color: Color(0xFF5C6AC4),
                      ),
                    ),
                  )
                ],
              ),
              SizedBox(
                height: 20,
              ),
              SizedBox(height: 10),
              FutureBuilder(
                future: getListProductCategory(widget.categories.id),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (snapshot.hasError) {
                    print(snapshot.error);
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else {
                    final data = snapshot.data;
                    return GridView.builder(
                        itemCount: data!.length,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate:
                            const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          childAspectRatio: 0.6,
                          crossAxisSpacing: 2,
                          // mainAxisSpacing: 10,
                        ),
                        itemBuilder: (context, index) {
                          return ListCategory(data[index]!);
                        });
                  }
                },
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget ListCategory(Product product) {
    return InkWell(
      onTap: (){
        Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) =>
                  ProductScreen(product: product,),
            ));
      },
       child:  Center(
          child: Container(
            width: 200,
            margin: const EdgeInsets.only(right: 15, bottom: 10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 180,
                  child: Stack(
                    children: [
                      InkWell(
                        onTap: () {
                          // Navigator.push(
                          //     context,
                          //     MaterialPageRoute(
                          //       builder: (context) =>
                          //           ProductScreen(),
                          //     ));
                        },
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(20),
                          child: Image.network(
                            product.image!,
                            width: 180,
                            height: 220,
                            fit: BoxFit.cover,
                            // height: 180,
                            // width: 150,
                            // fit: BoxFit.cover
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 5),
                SizedBox(
                  width: 190,
                  child: Text(
                    product.name!,
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(height: 5),
                Row(
                  children: [
                    Text(
                      numberFormatted(product.price!.first),
                      style: const TextStyle(
                          color: kPrimaryColor,
                          fontSize: 14,
                          fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    const Icon(Icons.star, color: Colors.yellow, size: 12),
                    Text('(' + "${product.rating!}" + ')',
                        style:
                        TextStyle(fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                )
              ],
            ),
          ),
        )
    );
  }
}
