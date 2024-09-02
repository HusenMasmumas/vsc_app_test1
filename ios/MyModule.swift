//
//  MyModule.swift
//  vsc_app_test1
//
//  Created by Husen Masmumas on 24/7/2567 BE.
//

import Foundation
import React


@objc(MyModule)
class MyModule: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    return "MyModule"
  }

  static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc func myFunction(_ callback: @escaping RCTResponseSenderBlock) {
    let result = "Hello from Swift! Test"
    callback([NSNull(), result])
  }
}
