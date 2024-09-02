//
//  MyModule.m
//  vsc_app_test1
//
//  Created by Husen Masmumas on 24/7/2567 BE.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(MyModule, NSObject)

RCT_EXTERN_METHOD(myFunction:(RCTResponseSenderBlock)callback)

@end
